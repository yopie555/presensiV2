import React from 'react';
import { WebView } from 'react-native-webview';

const Panduan = () => {
    return (
        <WebView
            source={{ uri: 'https://ict.umrah.ac.id/panduan-layanan/' }}
        />
    );
}
export default Panduan;
