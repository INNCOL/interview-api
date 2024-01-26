import { Controller, Get } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";

type Item = {
    title: string;
    description: string;
    url: string;
    avatar: string;
};

@ApiBearerAuth()
@ApiTags('Beginner')
@Controller({ version: '1' })
export class ItemsController {
    private generateRandomDescription(): string {
        const descriptions = [
            'Tiene como objetivo crear productos y herramientas que aumenten la productividad de los ingenieros y operadores en las industrias de aviación y petróleo y gas.',
            'Buscamos mejorar la eficiencia y calidad en el trabajo de profesionales mediante nuestras soluciones innovadoras.',
            'Nos especializamos en desarrollar herramientas que facilitan las operaciones y optimizan los procesos en diversas industrias.',
            'Con un enfoque centrado en la innovación, creamos productos que responden a las necesidades cambiantes del mercado.',
            'Dedicados a impulsar la excelencia, nuestros productos están diseñados para llevar la eficiencia a nuevas alturas.',
            'Inspirados por la pasión por la tecnología, creamos soluciones que marcan la diferencia en la vida de los profesionales.',
            'Comprometidos con la excelencia y la mejora continua, contribuimos al éxito de nuestros clientes con nuestras herramientas avanzadas.',
            'Exploramos nuevas fronteras en el desarrollo de productos para brindar soluciones vanguardistas a nuestros usuarios.',
            'Nuestro compromiso es proporcionar herramientas que simplifiquen las tareas diarias y mejoren la productividad en todos los niveles.',
            'En la búsqueda de la perfección operativa, creamos productos que elevan los estándares de eficiencia en cada industria que servimos.',
        ];

        const randomIndex = Math.floor(Math.random() * descriptions.length);
        return descriptions[randomIndex];
    }

    @Get('items')
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    findAll(): Item[] {
        return Array.from({ length: 10 }, (_, index) => ({
            title: `Inncol ${index + 1}`,
            description: this.generateRandomDescription(),
            url: `https://www.inncol.com.mx/`,
            avatar: `https://www.inncol.com.mx/assets/inncol.svg`,
        }));
    }
}

function Version(arg0: string): (target: ItemsController, propertyKey: "generateRandomDescription", descriptor: TypedPropertyDescriptor<() => string>) => void | TypedPropertyDescriptor<() => string> {
    throw new Error("Function not implemented.");
}
