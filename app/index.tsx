import { Link } from "expo-router"
import { Text, View, Image} from "react-native"
import { ThemedText } from '@/components/ThemedText';
import { Button } from "@/components/Button";
import { router } from "expo-router";


export default function WelcomeScreen() {

    const handleBlogin = () => {
        router.navigate("/(account)/login");
    }

    const handleBregistro = () => {
        router.navigate("/(account)/register");
    }

    return (
        <View className="bg-slate-400 h-full pl-5 pr-5 justify-center">
            
            
            
            
            <View className="h-28 pl-30 pb-20 place-items-center">
                <ThemedText type="title">¡Bienvenido!</ThemedText>
            </View>
            
            <View className="flex-row justify-evenly">
                <Button className="color" label="Registrarse" onPress={handleBregistro}></Button>
                <Button className="color" label="Ingresar" onPress={handleBlogin}></Button>
            </View>
            
        </View>

    )
}