import { ActionFunction, useFetcher, json } from "remix";
import { estimate, sendData, validateEstimate, validateForm } from "~/calculator";
import ErrorMessage from "~/components/ErrorMessage";
import Results from "~/components/Results";

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData()

    try {
        await validateForm(formData)
    } catch (errors) {
        return json({ errors })
    }

    const recibo = formData.get('recibo')?.toString()
    const tarifa = formData.get('tarifa')?.toString()
    const celphone = formData.get('telefono')?.toString()


    const estimation = estimate(recibo, tarifa)

    const {
        inversionResultados: cotizacion,
        capacidadFotovoltaica: capacidadFv,
        ahorrosAnuales,
        tiempo,
        co2:
        impactoEco
    } = estimation

    if (validateEstimate(estimation)) {
        sendData({
            recibo,
            tarifa,
            celphone,
            ahorrosAnuales,
            capacidadFv,
            cotizacion,
            tiempo,
            impactoEco
        })


        return json(estimation)
    }
}

export default function Calculator() {
    const { type, Form, data } = useFetcher()

    return (
        <div className="transition pt-4">
            <div className="mt-8 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-4">
                    <div className="mt-8 lg:col-span-6">
                        <Form method="post" className="space-y-4">
                            <div>
                                <label htmlFor="telefono" className="text-sm font-medium text-gray-700">
                                    Telefono
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="telefono"
                                        name="telefono"
                                        type="number"
                                        placeholder="Número de telefono de contacto"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {data?.errors?.telefono && <ErrorMessage message={data.errors.telefono} id="telefono" />}
                            </div>
                            <div>
                                <label htmlFor="recibo" className="text-sm font-medium text-gray-700">
                                    Cobro
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="recibo"
                                        name="recibo"
                                        type="number"
                                        placeholder="Pago bimestral"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {data?.errors?.recibo && <ErrorMessage message={data.errors.recibo} id="cobro" />}
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="tarifa" className="block text-sm font-medium text-gray-700">
                                    Tarifa
                                </label>
                                <div className="mt-1">
                                    <select
                                        id="tarifa"
                                        name="tarifa"
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    >
                                        <option value="">Selecciona...</option>
                                        <option value={1}>01</option>
                                        <option value={4.5}>Dac</option>
                                        <option value={3.3}>PBDT</option>
                                    </select>
                                </div>
                                {data?.errors?.tarifa && <ErrorMessage message={data.errors.tarifa} id="tarifa" />}
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Estimar
                                </button>
                            </div>
                        </Form>
                    </div>

                    <div className="mt-12 lg:mt-0 lg:col-start-7 lg:col-span-6 lg:row-start-1 lg:row-span-2">
                        <img
                            className="'lg:col-span-2 lg:row-span-2'"
                            src="https://planificacionestrategica.online/storage/calculator/recibo.jpg"
                            alt=""
                        />
                    </div>
                </div>
            </div>
            {
                (type === 'done' && !data.errors) && <Results estimation={data} />
            }
        </div>
    );
}