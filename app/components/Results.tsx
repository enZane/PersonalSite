import { Estimate, validateEstimate } from "~/calculator"
import InfoBlock from "./infoBlock"

export default function Results({ estimation }: { estimation: Estimate }) {

    const { ahorrosAnuales, capacidadFotovoltaica, co2, gananciaPeso, inversionResultados, tiempo } = estimation

    return (
        <div className="scroll-smooth lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-2 mt-4 px-4">
            <InfoBlock className='lg:col-span-5 lg:col-start-2' color='blue'>
                <h2 className="mt-2 text-3xl font-medium">Inversión:</h2>
                <h1 className="mt-8 text-4xl text-center font-medium">{ inversionResultados }</h1>
            </InfoBlock>
            {validateEstimate(estimation) && ( 
                <div className="lg:col-span-5 lg:col-start-7">
                    <InfoBlock className='lg:col-span-6 lg:col-start-7 mt-2' color='blue'>
                        <span>Capacidad Fotovoltaica: {capacidadFotovoltaica}</span>
                    </InfoBlock>
                    <InfoBlock className='mt-2' color='blue'>
                        <span>Ahorros anuales: {ahorrosAnuales}</span>
                    </InfoBlock>
                    <InfoBlock className='mt-2' color='blue'>
                        <span>Ganancia por peso invertido: {gananciaPeso}</span>
                    </InfoBlock>
                    <InfoBlock className='mt-2' color='blue'>
                        <span>Tiempo de recuperación de la inversión: {tiempo}</span>
                    </InfoBlock>
                </div>
            )}
            {
                validateEstimate(estimation) && (
                    <div className="lg:row-start-2 lg:col-start-2 lg:col-span-10 lg:gap-x-4 mt-4 pb-2">
                        <div className="">
                            <InfoBlock className='h-full' color='green'>
                                <span>{co2}</span>
                            </InfoBlock>
                        </div>
                    </div>
                )
            }
        </div>
    )
}