import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/lib/Constants/Colors';
import Info from '../../components/Info';
import DashboardContent from '../../components/DashboardContent';
import NowPlaying from '../../components/NowPlaying';

export default function Dashboard() {

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: COLORS.background }}>
      <View className="flex-1">
        <View
          className="p-4 flex-row justify-between items-center border-b"
          style={{ borderBottomColor: COLORS.card }}
        >
        </View>

        <View className="px-4 pt-4">
          <Info />
        </View>

        <DashboardContent />

        <NowPlaying />
      </View>
    </SafeAreaView>
  );
}