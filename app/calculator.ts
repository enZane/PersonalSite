import 'dotenv'
import { Client } from '@notionhq/client';
import * as Yup from "yup";

type CotizacionData = {
    recibo: string;
    tarifa: string;
    celphone: string;
    cotizacion: string | undefined;
    ahorrosAnuales: string | undefined;
    capacidadFv: string | undefined;
    tiempo: string | undefined;
    impactoEco: string | undefined;
}

export type Estimate = {
    inversionResultados: string | undefined;
    capacidadFotovoltaica: string | undefined;
    ahorrosAnuales: string | undefined;
    gananciaPeso: string | undefined;
    tiempo: string | undefined;
    co2: string | undefined;
}

export function estimate(recibo: string, tarifa: string): Estimate {

    let formatter = new Intl.NumberFormat('en-MX', {
        style: 'currency',
        currency: 'MXN',
    })

    const b2 = Number(recibo)
    const c3 = Number(tarifa)

    const d6 = 200
    const e4 = (b2 - b2 * (1 - 1 / 1.16)) * 0.056
    const e5 = (b2 - b2 * (1 - 1 / 1.16)) * 0.056
    const e6 = (b2 - b2 * (1 - 1 / 1.16) - d6) * 0.19
    const g6 = 4.7
    const g7 = 0.85
    const g9 = 25
    let j11 = false
    let j3
    let j5
    let j7
    let j8
    let j9
    let co2
    let arboles
    if (b2 !== 0 && c3) {

        if (c3 === 1) {
            const b14 = 0.8
            const b15 = 1.02
            const b16 = 2.9

            const b18 = b14 * 150
            const b19 = b15 * 130
            const b20 = (Number(b2) - b19 - b18)
            const b22 = b2 > b18 ? 150 : b2 / b14
            const b23 = b2 > (b18 + b19) ? 130 : (b2 - b18) / b15
            const b24 = b2 > (b22 + b23) ? ((b2 - b23 - b22) / b16) : 0

            const i3 = b24
            const i6 = Math.max(0.55, b24 / g6 / g7 / 60)
            const i9 = g9 * 1000 * i6
            const g11 = i3 * b16 * 6 * 1.16
            const g12 = g11 === 0 ? 'N/A' : i9 / g11
            const i11 = (g11 * 30) / i9
            if (b2 > 4500) {
                j11 = true
            }
            j3 = j11 ? "Asegúrate de introducir los datos correctamente" :
                g12 > 6 ? "Su consumo es altamente subsidiado, consulte a un asesor especializado de ImpulSolar"
                    : formatter.format(i9)
            j5 = j11 ? "Error" : i6.toFixed(1)
            j7 = j11 ? "Error" : formatter.format(g11)
            j8 = j11 ? "Error" : formatter.format(i11)
            j9 = j11 ? "Error" : Math.floor(g12)

            co2 = (b22 + b23 + b24) * 0.55 * 6 / 1000
            arboles = Math.ceil(co2 / 15 * 1000)
        }
        if (c3 === 4.5) {
            const b8 = b2 - 211
            const b9 = b8 / 1.16 * 0.16
            const b10 = b8 - b9
            const b11 = 0
            const b12 = b10 - b11
            const g3 = b12 / c3
            const i6 = Math.max(0.55, g3 / g6 / g7 / 60)
            const i9 = g9 * 1000 * i6
            const g11 = g3 * Number(c3) * 6 * 1.16
            const i11 = (g11 * 25) / i9
            const g12 = g11 === 0 ? 'N/A' : i9 / g11
            j3 = j11 ? "Asegúrate de introducir los datos correctamente" : formatter.format(i9)
            j5 = j11 ? "Error" : i6.toFixed(1)
            j7 = j11 ? "Error" : formatter.format(g11)
            j8 = j11 ? "Error" : formatter.format(i11)
            j9 = j11 ? "Error" : Math.floor(g12)

            co2 = g3 * 0.55 * 6 / 1000
            arboles = Math.ceil(co2 / 15 * 1000)
        }
        if (c3 === 3.3) {
            const b8 = b2 - 211
            const b9 = b8 / 1.16 * 0.16
            const b10 = b8 - b9
            const b11 = 200
            const b12 = b10 - b11
            const g3 = b12 / c3
            const i6 = Math.max(0.55, g3 / g6 / g7 / 60)
            const i9 = g9 * 1000 * i6
            const g11 = g3 * Number(c3) * 6 * 1.16
            const i11 = (g11 * 25) / i9
            const g12 = g11 === 0 ? 'N/A' : i9 / g11
            j3 = j11 ? "Asegúrate de introducir los datos correctamente" :
                g12 > 6 ? "Su consumo es demasiado bajo, consulte a un asesor especializado de ImpulSolar"
                    : formatter.format(i9)
            j5 = j11 ? "Error" : i6.toFixed(1)
            j7 = j11 ? "Error" : formatter.format(g11)
            j8 = j11 ? "Error" : formatter.format(i11)
            j9 = j11 ? "Error" : Math.floor(g12)
            co2 = g3 * 0.55 * 6 / 1000
            arboles = Math.ceil(co2 / 15 * 1000)
        }

        return {
            inversionResultados: j3,
            capacidadFotovoltaica: j5 + ' kW',
            ahorrosAnuales: j7,
            gananciaPeso: j8,
            tiempo: j9 + ' años',
            co2: `Cada año su sistema solar evitaría ${co2?.toFixed(2)} toneladas de CO2 lo que equivale a la captura de carbono de ${arboles} arboles`
        }
    }
    return {
        inversionResultados: j3,
        capacidadFotovoltaica: undefined,
        ahorrosAnuales: undefined,
        gananciaPeso: undefined,
        tiempo: undefined,
        co2: undefined
    }
}

export async function validateForm(formData: FormData) {
    const getValidationErrors = (err: any) => {
        const validationErrors = {} as any;
    
        err.inner.forEach((error: any) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
    
        return validationErrors;
      };
    
      // convert form into JSON object
      const formJSON: { [key: string]: any } = Object.fromEntries(formData);
      console.log(formJSON)

      // Yup schema for the object that I am trying to validate
      const projectSchema = Yup.object({
        telefono: Yup.string().required("Ingrese un numero de telefono"),
        recibo: Yup.string()
          .required("El cobro en su recibo es necesario"),
        tarifa: Yup.string()
          .required("Seleccione una tarifa")
      });
    
    //  validate the object and throw error if not valid
      try {
        const project = await projectSchema.validate(formJSON, { abortEarly: false });
        return project;
      } catch (error) {
        throw getValidationErrors(error);
      }
}

export function validateEstimate({inversionResultados}: Estimate) {
    return inversionResultados !== "Su consumo es altamente subsidiado, consulte a un asesor especializado de ImpulSolar"
}

export async function sendData({recibo, tarifa, celphone, cotizacion, ahorrosAnuales, capacidadFv, tiempo, impactoEco}: CotizacionData) {
    const notionSecret = process.env.NOTION_SECRET
    const database_id = process.env.DATABASE

    const notion = new Client({ auth: notionSecret })

    if (database_id) {
        try {
            const response = notion.pages.create({
                parent: { database_id },
                properties: {
                    Phone:{
                        type: 'title',
                        title: [{
                            type: 'text', 
                            text: {
                                content: celphone
                            }
                        }]
                    },
                    Cobro: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: recibo
                                }
                            }
                        ]
                    },
                    Date: {
                        date: {
                            start: new Date().toISOString()
                        }
                    },
                    Tarifa: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: tarifa
                                }
                            }
                        ]
                    },
                    Status: {
                        select: {
                            name: 'New'
                        }
                    },
                    Cotizacion: {
                        rich_text: [
                            {
                                type: 'text',
                                text: {
                                    content: cotizacion
                                }
                            }
                        ]
                    },
                    'Ahorros Anuales': {
                        rich_text:[
                            {
                                type: 'text',
                                text:{
                                    content: ahorrosAnuales
                                }
                            }
                        ]
                    },
                    'Tiempo de recuperacion': {
                        rich_text:[
                            {
                                type: 'text',
                                text: {
                                    content: tiempo 
                                }
                            }
                        ]
                    },
                    'Impacto ecologico':{
                        rich_text:[
                            {
                                type: 'text',
                                text:{
                                    content: impactoEco
                                }
                            }
                        ]
                    },
                    'Capacidad fotovoltaica':{
                        rich_text:[
                            {
                                type: 'text',
                                text:{
                                    content: capacidadFv
                                }
                            }
                        ]
                    },
                }
            })
        } catch(error: any) {
            console.log(error.body)
        }
    }
}