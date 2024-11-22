# ContractsUI

**ContractsUI** is a decentralized application built on the **Camino Network**, designed to revolutionize the tourism industry. The platform enables **suppliers**, **agencies**, and **tour guides** to share revenue transparently through blockchain technology. This project was developed as part of the **Chain4Travel Hackathon**.

## 🚀 Features

- **Mobile App**: A React Native-based mobile application for managing and interacting with the platform on the go.
- **Web Application**: A React-based web interface for broader accessibility.
- **Desktop Application**: A Tauri-powered desktop app, transformed from the web application for enhanced user experience on desktop devices.

## 🔗 How It Works

- **Blockchain-Powered Revenue Sharing**: All transactions and revenue distributions are recorded on the **Camino Network blockchain**, ensuring transparency and immutability.
- **Multi-Role Support**: The platform supports three types of users:  
  - **Suppliers**: Upload and manage tourism-related services.  
  - **Agencies**: Book services and collaborate with suppliers.  
  - **Tour Guides**: Partner with agencies and suppliers, earning revenue from bookings.  

## 🛠 Tech Stack

- **Frontend**:  
  - **React Native** for the mobile application.  
  - **React** for the web application.  
- **Desktop Integration**:  
  - **Tauri** to package the web application into a lightweight desktop app.  
- **Blockchain**:  
  - **Camino Network** for decentralized transaction management.

## 📖 Installation and Usage

### Mobile App

1. Clone the repository:
   
   ```bash
   git clone https://github.com/<your-username>/ContractsUI.git
   cd ContractsUI/mobile
   
2. Install dependencies:
   
   ```bash
   npm install
   
3. Run the app:
   
   ```bash
   npm start
  
4. Follow the React Native CLI instructions to run on your preferred emulator or physical device.

### Web Application

1. Navigate to the web-desktop directory:
   
    ```bash
   cd ContractsUI/web-desktop
    
2. Install dependencies:
   
    ```bash
   npm install
5. Start the web application:
   
    ```bash
   npm start
    
3. Open the application in your browser at http://localhost:3000.

### Desktop Application

1. Build the Tauri desktop app:
   
    ```bash
   cd ContractsUI/web-desktop
   npm run tauri:build
    
2. The built executable will be located in the target/release folder.

### Screenshots
![mobile](https://raw.githubusercontent.com/Omersut/ContractsUI/refs/heads/main/mobile-app-view.png)



