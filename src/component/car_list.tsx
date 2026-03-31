import type { Vector3Tuple } from "three"

export interface CarConfig {
    name: string
    url: string
    position: Vector3Tuple
    scale: Vector3Tuple
    rotation: Vector3Tuple
}

const BASE = "/kenney_car-kit/Models/GLB format/"

export const myCar: CarConfig[] = [

    { name: "race",           url: `${BASE}race.glb`,           position: [0, -0.6, -16], scale: [1,1,1], rotation: [0,  Math.PI / 2, 0] },
    { name: "sedan-sports",   url: `${BASE}sedan-sports.glb`,   position: [0, -0.6,  -8], scale: [1,1,1], rotation: [0,  Math.PI / 2, 0] },
    { name: "suv-luxury",     url: `${BASE}suv-luxury.glb`,     position: [0, -0.6,   0], scale: [1,1,1], rotation: [0,  Math.PI / 2, 0] },
    { name: "sedan",          url: `${BASE}sedan.glb`,          position: [0, -0.6,   8], scale: [1,1,1], rotation: [0,  Math.PI / 2, 0] },
    { name: "suv",            url: `${BASE}suv.glb`,            position: [0, -0.6,  16], scale: [1,1,1], rotation: [0,  Math.PI / 2, 0] },

    { name: "race-future",    url: `${BASE}race-future.glb`,    position: [6, -0.6, -16], scale: [1,1,1], rotation: [0, -Math.PI / 2, 0] },
    { name: "hatchback-sports",url:`${BASE}hatchback-sports.glb`,position:[6, -0.6,  -8], scale: [1,1,1], rotation: [0, -Math.PI / 2, 0] },
    { name: "taxi",           url: `${BASE}taxi.glb`,           position: [6, -0.6,   0], scale: [1,1,1], rotation: [0, -Math.PI / 2, 0] },
    { name: "police",         url: `${BASE}police.glb`,         position: [6, -0.6,   8], scale: [1,1,1], rotation: [0, -Math.PI / 2, 0] },
    { name: "ambulance",      url: `${BASE}ambulance.glb`,      position: [6, -0.6,  16], scale: [1,1,1], rotation: [0, -Math.PI / 2, 0] },

    { name: "firetruck",      url: `${BASE}firetruck.glb`,      position: [12, -0.6, -16], scale: [1,1,1], rotation: [0, -Math.PI / 2, 0] },
    { name: "garbage-truck",  url: `${BASE}garbage-truck.glb`,  position: [12, -0.6,  -8], scale: [1,1,1], rotation: [0, -Math.PI / 2, 0] },
    { name: "delivery",       url: `${BASE}delivery.glb`,       position: [12, -0.6,   0], scale: [1,1,1], rotation: [0, -Math.PI / 2, 0] },
    { name: "delivery-flat",  url: `${BASE}delivery-flat.glb`,  position: [12, -0.6,   8], scale: [1,1,1], rotation: [0, -Math.PI / 2, 0] },
    { name: "tractor",        url: `${BASE}tractor.glb`,        position: [12, -0.6,  16], scale: [1,1,1], rotation: [0, -Math.PI / 2, 0] },
]
