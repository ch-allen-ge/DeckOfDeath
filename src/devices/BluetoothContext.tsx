import { createContext, useState, useContext, useEffect } from 'react';

interface HeartRateMonitorProps {
    heartRateMonitor: any;
    setHeartRateMonitor: any;
    heartRateValue: any;
    disconnectHeartRateMonitor: any;
}
const HeartRateMonitorContext = createContext<HeartRateMonitorProps>({
    heartRateMonitor: null,
    setHeartRateMonitor: null,
    heartRateValue: null,
    disconnectHeartRateMonitor: null
});

export const HeartRateMonitorProvider = ({ children } : {children : React.ReactNode}) => {
  const [heartRateMonitor, setHeartRateMonitor] = useState(null);
  const [device, setDevice] = useState(null);
  const [heartRateValue, setHeartRateValue] = useState(0);

  useEffect(() => {
    //@ts-ignore
    const handleHeartRateChanged = (event) => {
        const heartRate = event.target.value.getUint8(1);
        setHeartRateValue(heartRate);
    };

    const handleDisconnect = () => {
      setHeartRateMonitor(null);
    }

    const connectToDevice = async () => {
        if (heartRateMonitor) {
            try {
                //@ts-ignore
                const server = await heartRateMonitor.gatt.connect();
                setDevice(server);
                //@ts-ignore
                heartRateMonitor.addEventListener('gattserverdisconnected', handleDisconnect);
                
                const service = await server.getPrimaryService('heart_rate');
                const characteristic = await service.getCharacteristic('heart_rate_measurement');
                
                characteristic.addEventListener('characteristicvaluechanged', handleHeartRateChanged);
                await characteristic.startNotifications();
            } catch (error) {
                console.error('Error connecting to heart rate monitor:', error);
            }
        }
    };

    connectToDevice();
  }, [heartRateMonitor]);

  const disconnectHeartRateMonitor = () => {
    if (device) {
      //@ts-ignore
      device.disconnect();
      setDevice(null);
      setHeartRateValue(0);
    }
  };

  return (
    <HeartRateMonitorContext.Provider value={{ heartRateMonitor, setHeartRateMonitor, heartRateValue, disconnectHeartRateMonitor}}>
      {children}
    </HeartRateMonitorContext.Provider>
  );
};

export const useHeartRateMonitor = () => {
  return useContext(HeartRateMonitorContext);
};