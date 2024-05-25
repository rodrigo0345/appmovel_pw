import type { App, Plugin } from 'vue';
import QrcodeStream from './components/QrcodeStream.vue';
import QrcodeCapture from './components/QrcodeCapture.vue';
import QrcodeDropZone from './components/QrcodeDropZone.vue';
export declare function install(app: App): void;
export { QrcodeStream, QrcodeCapture, QrcodeDropZone };
export { setZXingModuleOverrides, type BarcodeFormat } from 'barcode-detector/pure';
declare const plugin: Plugin;
export { plugin as VueQrcodeReader };
