import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { Car } from "./car.tsx";
import { myCar } from "./car_list.tsx";
import { Player } from "./player.tsx";
import { Garage } from "./garage.tsx";
import { Suspense } from "react";

export function Scene() {
    const { showPerf } = useControls("Debug", {
        showPerf: { label: "Show perf", value: false },
    });

    return (
        <>
            {showPerf && <Perf />}
            <Player cars={myCar}/>
            <Garage />
            {/*Suspense permet d'afficher null pendant le chargement du modèle GLTF.Sans ça, R3F planterait en attendant que le fichier .glb soit chargée*/}
            {myCar.map((car) => (
                <Suspense key={car.name} fallback={null}>
                    <Car {...car} />
                </Suspense>
            ))}
        </>
    );
}
