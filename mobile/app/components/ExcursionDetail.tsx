import React from 'react';
import { View, Text, StyleSheet, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import { mdlExcursionDetail } from '../models/domain/excursionDetail';
import { mdlExcursionOffer } from '../models/domain/excursionOffer';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

type ExcursionDetailProps = {
    callback: (offer: mdlExcursionOffer) => void;
    excursionDetail: mdlExcursionDetail;
};

const ExcursionDetail: React.FC<ExcursionDetailProps> = ({ excursionDetail, callback }) => {
    const { detail, offers } = excursionDetail;

    if (!detail) return null; // Early return if no excursion detail exists

    const { excursionName, duration, locationId, coverImage, currencyCode } = detail;

    return (
        <View style={styles.card}>
            {/* Card Cover */}
            <Image
                source={coverImage ? { uri: `https://dev.sanoctopus.com/files/0c4c8c45-2518-4622-be3b-523e6a2a43d5/${coverImage}` } : require('@/assets/images/placeHolder.jpg')}
                style={styles.coverImage}
            />

            {/* Title and Information */}
            <Text style={styles.title}>{excursionName || "Excursion Title"}</Text>
            <View style={styles.info}>
                <Text style={styles.infoText}>
                    <Ionicons name="location-outline" size={16} /> {locationId}
                </Text>
                <Text style={styles.infoText}>
                    <MaterialCommunityIcons name="clock-time-four-outline" size={16} /> {duration}
                </Text>
            </View>

            {/* Tabs for Offers, Details, Gallery */}
            <View style={styles.tabs}>
                <TouchableOpacity style={styles.tab} onPress={() => { /* Switch to Offers */ }}>
                    <Text>Offers</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab} onPress={() => { /* Switch to Details */ }}>
                    <Text>Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab} onPress={() => { /* Switch to Gallery */ }}>
                    <Text>Gallery</Text>
                </TouchableOpacity>
            </View>

            {/* Offers List */}
            <FlatList
                data={offers}
                keyExtractor={(item, index) => `${index}`}
                renderItem={({ item }) => (
                    <View style={styles.offerCard}>
                        <Text>Date: {item.date}</Text>
                        <Text>Time: {item.time}</Text>
                        <Text>Price: {item.currencyCode} {item.price.toFixed(2)}</Text>
                        <Button
                            title={item.isAvailable ? "Book Now" : "Unavailable"}
                            onPress={() => callback(item)}
                            disabled={!item.isAvailable}
                        />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        padding: 15,
    },
    coverImage: {
        width: '100%',
        height: 300,
        borderRadius: 8,
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    info: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 10,
    },
    infoText: {
        marginRight: 10,
        fontSize: 14,
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    tab: {
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'gray',
    },
    offerCard: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#ddd',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
});

export default ExcursionDetail;
