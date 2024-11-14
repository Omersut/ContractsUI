import React, { useState } from 'react';
import { Typography, Layout, Input } from 'antd';
import { color, motion } from 'framer-motion';


const { Title, Paragraph } = Typography;
const { Content } = Layout;
const { TextArea } = Input;

const Description = () => {
    return (
        <div style={styles.fullscreen}>
            <div style={styles.content}>
                <div style={styles.textContainer}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <Title level={1} style={styles.title}>
                            Revolutionizing Tourism with Blockchain!
                        </Title>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                    >
                        <Paragraph style={styles.paragraph}>
                            Embark on your journey by connecting your wallet to unlock blockchain-secured tours designed by expert guides.
                            <br />
                            Explore new destinations in a way you've never imagined!
                        </Paragraph>
                    </motion.div>
                </div>
            </div>
        </div>

    )
}

const styles = {
    fullscreen: {
        zIndex: 1,
        position: 'absolute' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    content: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        textAlign: 'center' as const,
        paddingTop: '15%',
        paddingRight: '20px',
        paddingLeft: '20px',
    },
    textContainer: {
        maxWidth: '100%',
        margin: '20px',
        color: '#fff !important'

    },
    title: {
        marginBottom: '20px',
        fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
    },
    paragraph: {
        fontSize: 'clamp(1rem, 4vw, 1.25rem)',
        marginBottom: '30px',
    },

};


export default Description