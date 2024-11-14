// globals.d.ts or any other type definition file
import { Web3Provider } from '@ethersproject/providers'; // Ensure correct type for Web3Provider

declare global {
    interface Window {
        ethereum: any; // Declare ethereum on the window object
    }
}
