import { z } from 'zod';

/* El mismo Zod de la Semana 4 y de la Semana 8.
   Lo que cambia hoy es QUIÉN tiene que cumplir el contrato:
   antes era el navegador, hoy también es el modelo. */

export const prioridades = ['baja', 'media', 'alta'] as const;
export const areas = ['frontend', 'backend', 'pruebas', 'diseño', 'otro'] as const;

export const tareaNueva = z.object({
  titulo: z
    .string()
    .min(3, 'Mínimo 3 caracteres')
    .max(80, 'Máximo 80 caracteres')
    .describe('Qué hay que hacer, en imperativo y en una línea'),
  prioridad: z
    .enum(prioridades)
    .describe('alta si alguien está bloqueado o hay fecha; baja si puede esperar'),
  responsable: z
    .string()
    .nullable()
    .describe('El nombre de quien debe hacerla, o null si el texto no lo dice'),
  fechaLimite: z
    .string()
    .nullable()
    .describe(
      'Fecha límite en formato DD-MM-AAAA. Si el texto dice algo como ' +
        '"el viernes" o "mañana", calcúlala a partir de la fecha de hoy. ' +
        'null si el texto no menciona ninguna fecha',
    ),
  area: z
    .enum(areas)
    .describe(
      'A qué parte del proyecto pertenece: frontend si es de pantallas o ' +
        'estilos, backend si es de servidor, pagos o base de datos, pruebas ' +
        'si es de tests o QA, diseño si es de logos o mockups, otro si no encaja',
    ),
});

export type TareaNueva = z.infer<typeof tareaNueva>;

/* Los .describe() no son comentarios: VIAJAN al modelo.
   Son las instrucciones que lee para llenar cada campo. */
