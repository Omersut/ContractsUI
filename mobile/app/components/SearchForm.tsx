import React, { FC } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { mdlSearchExcursionRequest } from '../models/service-models/SearchExcursionRequest';

interface SearchFormProps {
    onSearch: (formData: mdlSearchExcursionRequest) => void;
    selectedNationality: string;
    setSelectedNationality: React.Dispatch<React.SetStateAction<string>>;
    adultCount: string;
    setAdultCount: React.Dispatch<React.SetStateAction<string>>;
    fromDate: string;
    setFromDate: React.Dispatch<React.SetStateAction<string>>;
    toDate: string;
    setToDate: React.Dispatch<React.SetStateAction<string>>;
}

const SearchForm: FC<SearchFormProps> = ({
    onSearch,
    selectedNationality,
    setSelectedNationality,
    adultCount,
    setAdultCount,
}) => {
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
    const [isStartDatePicker, setStartDatePicker] = React.useState(true); // To track if it's start date or end date
    const [startDate, setStartDate] = React.useState<Date | null>(null);
    const [endDate, setEndDate] = React.useState<Date | null>(null);

    // Get today's date to restrict date selection
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to avoid time issue

    const showDatePicker = (isStart: boolean) => {
        setStartDatePicker(isStart);
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        if (isStartDatePicker) {
            setStartDate(date);
            // Clear end date if new start date is selected
            if (endDate && date > endDate) {
                setEndDate(null); // Reset end date if it's after the new start date
            }
        } else {
            if (startDate && date < startDate) {
                Alert.alert('Error', 'End date cannot be earlier than start date');
            } else {
                setEndDate(date);
            }
        }
        hideDatePicker();
    };

    const handleSearch = () => {
        if (!startDate || !endDate || !adultCount || !selectedNationality || !startDate || !endDate) {
            Alert.alert('Error', 'Please fill in all fields before searching.');
            return;
        }

        // Format the dates to YYYY-MM-DD
        const formatDate = (date: Date) => {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        onSearch({
            adultCount: Number(adultCount),
            fromDate: startDate ? formatDate(startDate) : '',
            nationality: selectedNationality,
            toDate: endDate ? formatDate(endDate) : '',
        });
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('@/assets/images/logo.png')}
                style={styles.logo}
            />

            <View style={styles.dateContainer}>
                <Text style={styles.label}>Select Date Range</Text>
                <TouchableOpacity style={styles.dateButton} onPress={() => showDatePicker(true)}>
                    <Text style={styles.dateButtonText}>
                        {startDate ? `Start: ${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${startDate.getDate().toString().padStart(2, '0')}` : 'Start Date'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dateButton} onPress={() => showDatePicker(false)}>
                    <Text style={styles.dateButtonText}>
                        {endDate ? `End: ${endDate.getFullYear()}-${(endDate.getMonth() + 1).toString().padStart(2, '0')}-${endDate.getDate().toString().padStart(2, '0')}` : 'End Date'}
                    </Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.label}>Nationality</Text>
            <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={selectedNationality}
                    onValueChange={(itemValue) => setSelectedNationality(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Select Nationality" value="" />
                    <Picker.Item label="American" value="US" />
                    <Picker.Item label="German" value="DE" />
                    <Picker.Item label="Turkish" value="TR" />
                </Picker>
            </View>

            <Text style={styles.label}>Adult Count</Text>
            <TextInput
                style={styles.input}
                placeholder="Number of adults"
                keyboardType="numeric"
                value={adultCount}
                onChangeText={setAdultCount}
            />

            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>

            {/* Date Picker Modal */}
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                minimumDate={today}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
        flex: 1,
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#4A90E2',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        color: '#333',
    },
    dateContainer: {
        marginBottom: 20,
    },
    dateButton: {
        padding: 15,
        backgroundColor: '#4A90E2',
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    dateButtonText: {
        color: 'white',
        fontSize: 16,
    },
    pickerWrapper: {
        backgroundColor: '#fff',
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 20,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingLeft: 10,
        backgroundColor: '#fff',
    },
    searchButton: {
        backgroundColor: '#841584',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    searchButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    logo: {
        height: 200,
        width: 200,
        marginLeft: 50

    },
});

export default SearchForm;
