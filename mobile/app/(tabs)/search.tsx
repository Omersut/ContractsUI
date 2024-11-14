import React, { FC, useState, useEffect } from 'react';
import { ScrollView, Text, ActivityIndicator, View, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import { ContractsService } from '../services/ContractsService';
import { mdlSearchExcursionResponse } from '../models/service-models/SearchExcursionResponse';
import { mdlExcursion } from '../models/domain/excursion';
import { mdlExcursionDetail } from '../models/domain/excursionDetail';
import SearchForm from '../components/SearchForm';
import ExcursionList from '../components/ExcursionList';
import ExcursionDetail from '../components/ExcursionDetail';
import Booking from '../components/Booking'; // Import Booking component
import { mdlSearchExcursionRequest } from '../models/service-models/SearchExcursionRequest';

const Search: FC = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedNationality, setSelectedNationality] = useState('Select Nationality');
    const [adultCount, setAdultCount] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchExcursionResponse, setSearchExcursionResponse] = useState<mdlSearchExcursionResponse | undefined>();
    const [excursionDetail, setExcursionDetail] = useState<mdlExcursionDetail | undefined>();

    const [currentIndex, setCurrentIndex] = useState(0); // Track which view is currently displayed

    useEffect(() => {
        // Automatically move to the next screen after loading search results or excursion details
        if (searchExcursionResponse && currentIndex === 0) {
            setCurrentIndex(1); // Move to List view automatically after search
        } else if (excursionDetail && currentIndex === 1) {
            setCurrentIndex(2); // Move to Detail view automatically after selecting an excursion
        } else if (excursionDetail && currentIndex === 2) {
            setCurrentIndex(3); // Move to Booking after viewing excursion details
        }
    }, [searchExcursionResponse, excursionDetail]);

    const handleSearch = async (formData: mdlSearchExcursionRequest) => {
        setLoading(true);
        setError(null);
        try {
            const response = await ContractsService.SearchExcursion(formData);
            if (response) {
                setSearchExcursionResponse(response);
            } else {
                setSearchExcursionResponse(undefined);
            }
        } catch (err) {
            setError('An error occurred while fetching data.');
        } finally {
            setLoading(false);
        }
    };

    const handleDetail = async (item: mdlExcursion) => {
        const response = await ContractsService.GetExcursionDetails({
            offerId: item.offerId,
            searchId: searchExcursionResponse?.metadata?.searchId || '',
        });

        if (response?.data) {
            setExcursionDetail({ detail: item, offers: response.data });
        }
    };

    const scrollToNext = () => {
        if (currentIndex < 3) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const scrollToPrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Search Form */}
            {currentIndex === 0 && (
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
                    <SearchForm
                        onSearch={handleSearch}
                        selectedNationality={selectedNationality}
                        setSelectedNationality={setSelectedNationality}
                        adultCount={adultCount}
                        setAdultCount={setAdultCount}
                        fromDate={fromDate}
                        toDate={toDate}
                        setFromDate={setFromDate}
                        setToDate={setToDate}
                    />
                    {error && <Text style={{ color: 'red', fontWeight: 'bold' }}>{error}</Text>}
                    {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginBottom: 20 }} />}
                </ScrollView>
            )}

            {/* Excursion List */}
            {currentIndex === 1 && (
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
                    <TouchableOpacity onPress={scrollToPrevious} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <ExcursionList
                        excursions={searchExcursionResponse?.data.items || []}
                        onViewDetail={handleDetail}
                    />
                </ScrollView>
            )}

            {/* Excursion Detail */}
            {currentIndex === 2 && (
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
                    <TouchableOpacity onPress={scrollToPrevious} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    {excursionDetail ? (
                        <ExcursionDetail excursionDetail={excursionDetail} callback={() => scrollToNext()} />
                    ) : (
                        <Text>No Excursion Details Available</Text>
                    )}
                </ScrollView>
            )}

            {/* Booking Form */}
            {currentIndex === 3 && (
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
                    <TouchableOpacity onPress={scrollToPrevious} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Booking />
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    backButton: {
        marginTop: 20,
        padding: 10,
        width: 70,
        backgroundColor: '#ff5c5c', // A prominent color for the back button
        borderRadius: 50, // Make the button circular
        justifyContent: 'center',
        alignItems: 'center',
    },
    backText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Search;
