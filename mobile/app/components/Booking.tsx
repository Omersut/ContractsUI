import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker
import { Ionicons } from '@expo/vector-icons'; // Using Expo vector icons for the download icon
import { mdlBookExcursionResponse } from '../models/service-models/BookExcursionResponse';
import { mdlExcursionDetail } from '../models/domain/excursionDetail';
import { ContractsService } from '../services/ContractsService';

const Booking = () => {
    const [formValues, setFormValues] = useState<any>({});
    const [bookResponse, setBookResponse] = useState<mdlBookExcursionResponse | null>(null);
    const [walletId, setWalletId] = useState<string | null>(null);
    const [excursionDetail, setExcursionDetail] = useState<mdlExcursionDetail | null>(null);
    const [searchCriteria, setSearchCriteria] = useState<any>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const bookingRef = useRef<View>(null);

    // Suppliers and agencies can still be part of the form, but we won't store anything
    const suppliers = [
        { id: 'supplier1', name: 'Supplier 1' },
        { id: 'supplier2', name: 'Supplier 2' },
        { id: 'supplier3', name: 'Supplier 3' },
    ];

    const agencies = [
        { id: 'agency1', name: 'Agency 1' },
        { id: 'agency2', name: 'Agency 2' },
        { id: 'agency3', name: 'Agency 3' },
    ];

    const handleSubmit = async () => {
        // const bookingRequest = {
        //     ...formValues,
        //     startDate: selectedDate ? selectedDate.toISOString().split('T')[0] : '', // Converting to YYYY-MM-DD
        // };

        // const response = await ContractsService.BookExcursion(bookingRequest);
        // if (response) {
        //     setBookResponse(response);
        // }
    };

    const downloadAsImage = () => {
        // React Native doesn't support html-to-image directly
        // This can be replaced by a custom solution to save the confirmation
        alert('This feature is not available in React Native');
    };

    const handleDateChange = (event: any, selectedDate: Date | undefined) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setSelectedDate(selectedDate);
            setFormValues({ ...formValues, startDate: selectedDate.toISOString().split('T')[0] });
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {bookResponse ? (
                <View style={styles.confirmContainer}>
                    <Text style={styles.confirmTitle}>Booking Confirmation</Text>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoItem}><Text style={styles.label}>Excursion:</Text> {bookResponse.excursionName}</Text>
                        <Text style={styles.infoItem}><Text style={styles.label}>Price:</Text> {bookResponse.price} {bookResponse.currency}</Text>
                        <Text style={styles.infoItem}><Text style={styles.label}>Start Time:</Text> {bookResponse.startTime}</Text>
                    </View>
                    <TouchableOpacity style={styles.downloadButton} onPress={downloadAsImage}>
                        <Ionicons name="download-outline" size={24} color="white" />
                        <Text style={styles.downloadButtonText}>Download Confirmation</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.formContainer}>
                    {searchCriteria && excursionDetail && (
                        <View style={styles.form}>
                            <Text style={styles.title}>Excursion Booking</Text>

                            <TextInput
                                style={styles.input}
                                placeholder="Lead Name"
                                value={formValues.leadName}
                                onChangeText={(text) => setFormValues({ ...formValues, leadName: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Excursion Name"
                                value={formValues.excursionName}
                                editable={false}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Variation"
                                value={formValues.excursionVariation}
                                onChangeText={(text) => setFormValues({ ...formValues, excursionVariation: text })}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Tour Guide Wallet"
                                value={formValues.tourGuideWallet}
                                editable={!walletId}
                                onChangeText={(text) => setFormValues({ ...formValues, tourGuideWallet: text })}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Number of Pax"
                                keyboardType="numeric"
                                value={String(formValues.paxCount)}
                                onChangeText={(text) => setFormValues({ ...formValues, paxCount: Number(text) })}
                            />

                            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
                                <Text style={styles.datePickerText}>{selectedDate ? selectedDate.toLocaleDateString() : 'Select Start Date'}</Text>
                            </TouchableOpacity>

                            {showDatePicker && (
                                <DateTimePicker
                                    value={selectedDate || new Date()}
                                    mode="date"
                                    display="default"
                                    onChange={handleDateChange}
                                />
                            )}

                            <TextInput
                                style={styles.input}
                                placeholder="Travel Agent Wallet"
                                value={formValues.travelAgentWallet}
                                onChangeText={(text) => setFormValues({ ...formValues, travelAgentWallet: text })}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Nationality"
                                value={formValues.nationality}
                                onChangeText={(text) => setFormValues({ ...formValues, nationality: text })}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Supplier"
                                value={formValues.supplierWallet}
                                onChangeText={(text) => setFormValues({ ...formValues, supplierWallet: text })}
                            />

                            <Text style={styles.price}>Total Price: {excursionDetail.selectedOffer?.price} {excursionDetail.selectedOffer?.currencyCode}</Text>

                            <Button title="Book Now" onPress={handleSubmit} />
                        </View>
                    )}
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    confirmContainer: {
        padding: 30,
        borderRadius: 8,
        textAlign: 'center',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
    confirmTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1890ff',
        marginBottom: 20,
    },
    infoContainer: {
        marginBottom: 20,
    },
    infoItem: {
        fontSize: 16,
        lineHeight: 1.5,
        color: '#555',
        marginBottom: 8,
    },
    label: {
        fontWeight: 'bold',
    },
    formContainer: {
        padding: 16,
    },
    form: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 16,
        paddingHorizontal: 10,
    },
    datePickerButton: {
        paddingVertical: 12,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    datePickerText: {
        fontSize: 16,
        color: '#555',
    },
    price: {
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 16,
    },
    downloadButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1890ff',
        padding: 10,
        borderRadius: 8,
        marginTop: 20,
    },
    downloadButtonText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
    },
});

export default Booking;
