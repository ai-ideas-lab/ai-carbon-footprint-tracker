export declare const carbonFactors: {
    transportation: {
        car_gasoline: {
            factor: number;
            description: string;
            source: string;
        };
        car_diesel: {
            factor: number;
            description: string;
            source: string;
        };
        electric_car: {
            factor: number;
            description: string;
            source: string;
        };
        bus: {
            factor: number;
            description: string;
            source: string;
        };
        subway: {
            factor: number;
            description: string;
            source: string;
        };
        train: {
            factor: number;
            description: string;
            source: string;
        };
        airplane: {
            factor: number;
            description: string;
            source: string;
        };
    };
    food: {
        beef: {
            factor: number;
            description: string;
            source: string;
        };
        pork: {
            factor: number;
            description: string;
            source: string;
        };
        chicken: {
            factor: number;
            description: string;
            source: string;
        };
        rice: {
            factor: number;
            description: string;
            source: string;
        };
        vegetables: {
            factor: number;
            description: string;
            source: string;
        };
        fruits: {
            factor: number;
            description: string;
            source: string;
        };
    };
    energy: {
        electricity: {
            factor: number;
            description: string;
            source: string;
        };
        natural_gas: {
            factor: number;
            description: string;
            source: string;
        };
        coal: {
            factor: number;
            description: string;
            source: string;
        };
        heating: {
            factor: number;
            description: string;
            source: string;
        };
    };
    shopping: {
        clothes: {
            factor: number;
            description: string;
            source: string;
        };
        electronics: {
            factor: number;
            description: string;
            source: string;
        };
        furniture: {
            factor: number;
            description: string;
            source: string;
        };
        books: {
            factor: number;
            description: string;
            source: string;
        };
    };
    housing: {
        water: {
            factor: number;
            description: string;
            source: string;
        };
        waste: {
            factor: number;
            description: string;
            source: string;
        };
        construction: {
            factor: number;
            description: string;
            source: string;
        };
    };
    waste: {
        landfill: {
            factor: number;
            description: string;
            source: string;
        };
        recycling: {
            factor: number;
            description: string;
            source: string;
        };
        composting: {
            factor: number;
            description: string;
            source: string;
        };
    };
};
export declare function initCarbonFactors(): boolean;
export declare function getCarbonFactor(category: string, type: string): number | null;
export declare function getAllCarbonFactors(): {
    transportation: {
        car_gasoline: {
            factor: number;
            description: string;
            source: string;
        };
        car_diesel: {
            factor: number;
            description: string;
            source: string;
        };
        electric_car: {
            factor: number;
            description: string;
            source: string;
        };
        bus: {
            factor: number;
            description: string;
            source: string;
        };
        subway: {
            factor: number;
            description: string;
            source: string;
        };
        train: {
            factor: number;
            description: string;
            source: string;
        };
        airplane: {
            factor: number;
            description: string;
            source: string;
        };
    };
    food: {
        beef: {
            factor: number;
            description: string;
            source: string;
        };
        pork: {
            factor: number;
            description: string;
            source: string;
        };
        chicken: {
            factor: number;
            description: string;
            source: string;
        };
        rice: {
            factor: number;
            description: string;
            source: string;
        };
        vegetables: {
            factor: number;
            description: string;
            source: string;
        };
        fruits: {
            factor: number;
            description: string;
            source: string;
        };
    };
    energy: {
        electricity: {
            factor: number;
            description: string;
            source: string;
        };
        natural_gas: {
            factor: number;
            description: string;
            source: string;
        };
        coal: {
            factor: number;
            description: string;
            source: string;
        };
        heating: {
            factor: number;
            description: string;
            source: string;
        };
    };
    shopping: {
        clothes: {
            factor: number;
            description: string;
            source: string;
        };
        electronics: {
            factor: number;
            description: string;
            source: string;
        };
        furniture: {
            factor: number;
            description: string;
            source: string;
        };
        books: {
            factor: number;
            description: string;
            source: string;
        };
    };
    housing: {
        water: {
            factor: number;
            description: string;
            source: string;
        };
        waste: {
            factor: number;
            description: string;
            source: string;
        };
        construction: {
            factor: number;
            description: string;
            source: string;
        };
    };
    waste: {
        landfill: {
            factor: number;
            description: string;
            source: string;
        };
        recycling: {
            factor: number;
            description: string;
            source: string;
        };
        composting: {
            factor: number;
            description: string;
            source: string;
        };
    };
};
//# sourceMappingURL=carbonFactors.d.ts.map