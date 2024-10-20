import { Button } from "@/components/buttons/Button";
import { Select } from "@/components/Select";
import { useToast } from "@/components/Toast";
import { getTripById, joinTrip } from "@/services/trip";
import { User, TripById } from "@/types/types";
import { parseUrlParams } from "@/utils/utils";
import { Link, router, useLocalSearchParams } from "expo-router"
import { useContext, useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native"
import { CardDriver } from "./CardDriver";
import { GlobalContext } from "@/utils/Provider";
import { Skeleton } from "@/components/Skeleton";
import { LoadingScreen } from "./LoadingScreen";

export default function DetailTripScreen() {
    const { id } = useLocalSearchParams();
    const context = useContext(GlobalContext);
    const idPassenger = context?.user.id?.toString()
    const [trip, setTrip] = useState<TripById>()
    const [driver, setDriver] = useState<User>()

    const [loading, setLoading] = useState(true)
    const { toast } = useToast();


    useEffect(() => {
        if (!loading && !trip) {
            toast('Hubo un error al cargar el detalle del viaje', 'destructive', 2500, 'top', false);
            router.replace('/(home)/trips/tripList');
        }
    }, [loading, trip]);


    useEffect(() => {

        const getDetail = async (id: string) => {

            setLoading(true)

            console.log('fetch con id' + id + ' Por ahora solo funciona con id 1');
            const trip = await getTripById(id)
            console.log("trip getted");
            console.log(trip);

            if (trip) {
                setTrip(trip)
                setDriver(trip.vehicle_driver.driver.user)
            }
            setLoading(false)
        }

        if (!id) {
            router.push('/(home)/trips/tripList')
            return
        }
        let idParsed = parseUrlParams(id)
        getDetail(idParsed)
    }, [])


    const handleJoinTrip = async () => {
        if (!idPassenger) return
        toast('Uniendose al viaje', 'info', 2800, 'top')
        const { data, error } = await joinTrip(idPassenger, parseUrlParams(id))
        if (error) {
            toast('Hubo un error en la conexion con el servidor', 'destructive', 2800, 'top', false);
            return
        }
        toast('Se ha unido al viaje! Puedes hablar con el conductor para coordinar el viaje', 'success', 4000, 'top', false);

    }


    if (loading) return (<LoadingScreen />)

    console.log('devuelve algo');

    if (!trip || !driver) return
    console.log('devuelve algo');

    return (
        <ScrollView>
            <View>
                <Image source={require('@/assets/images/googleMapsExample.png')}
                    className="h-[230] object-cover"
                />
            </View>
            <View className="bg-background flex items-start justify-start h-full pl-8 pr-8">

                <View className="mt-7 " >
                    <Text className="font-semibold dark:color-slate-200 ">Lugar de inicio de viaje</Text>
                    <Text className="text-[#64748B]">Ciudad: {trip.arrival_address?.city.name}, calle {trip.arrival_address?.street}</Text>
                </View>
                <View className="mt-3">
                    <Text className="font-semibold dark:color-slate-200">Lugar de finalizacion del viaje</Text>
                    <Text className="text-[#64748B]">Cuidad {trip.departure_address?.city.name}, calle {trip.departure_address?.street}</Text>
                </View>

                <View className="mt-3">
                    <Text className="font-semibold dark:color-slate-200">Fecha y hora de salida</Text>
                    <Text className="text-[#64748B]">Fecha: {trip.departure_date}</Text>
                    <Text className="text-[#64748B]">Hora: {trip.departure_time}</Text>
                </View>

                <View className="mt-3">
                    <Text className="font-semibold dark:color-slate-200">Asientos disponibles</Text>
                    <Text className="text-[#64748B]">{trip.available_seats}</Text>
                </View>

                <View className="mt-3">
                    <Text className="font-semibold dark:color-slate-200">Precio por asiento</Text>
                    <Text className="text-[#64748B]">{trip.seat_price} ARS</Text>
                </View>

                <View className="mt-8 w-full">
                    <CardDriver driver={driver} vehicle={trip.vehicle_driver.vehicle} />
                </View>

                <View className="self-center mt-8 mb-6">
                    <Button className="w-52" label="Unirse al viaje"
                        onPress={handleJoinTrip} />
                </View>
            </View>
        </ScrollView >
    )
}