import React, { FC } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { mdlExcursion } from '../models/domain/excursion';

interface ExcursionListProps {
    excursions: mdlExcursion[];
    onViewDetail: (excursion: mdlExcursion) => void;
}

const ExcursionList: FC<ExcursionListProps> = ({ excursions, onViewDetail }) => {
    return (
        <View style={styles.container}>
            {excursions.length > 0 ? (
                excursions.map((item) => (
                    <View key={item.excursionId} style={styles.excursionCard}>
                        <TouchableOpacity onPress={() => onViewDetail(item)}>
                            <Image
                                source={item.coverImage ? { uri: `https://dev.sanoctopus.com/files/0c4c8c45-2518-4622-be3b-523e6a2a43d5/${item.coverImage}` } : require('@/assets/images/placeHolder.jpg')}
                                style={styles.coverImage}
                            />
                            <Text style={styles.excursionName}>{item.excursionName}</Text>
                            <Text>{item.duration}</Text>
                            <Text>{item.pricePerExcursion} {item.currencyCode}</Text>
                            <Text>{item.excursionStartDate} - {item.excursionEndDate}</Text>
                            <Text style={styles.viewDetailsText}>{item.currencyCode} {item.pricePerExcursion}</Text>
                        </TouchableOpacity>
                    </View>
                ))
            ) : (
                <Text>No results found.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    excursionCard: {
        marginBottom: 20,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#f8f8f8',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    coverImage: {
        width: '100%',
        height: 300,
        borderRadius: 8,
        marginBottom: 10,
    },
    excursionName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    viewDetailsText: {
        color: 'blue',
        marginTop: 10,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'right'
    },
});

export default ExcursionList;
