// Based on "Terminos y Condiciones ACTIVA 1.docx" (Versión 2026-09-30), with the final values and the
// alignment with the Reglas de Negocio (refunds, renewal, notice) decided by ACTIVA on 2026-10-08.
// Inline markup: **bold**, [label](href), {{pending}} — see RichText.tsx.
import type { TermsDoc } from "../model";

export const TERMINOS: TermsDoc = {
  title: "Términos y Condiciones de ACTIVA",
  subtitle: "Membresías para personas vinculadas a empresas y asociaciones participantes",
  version: "2026-10-08",
  effective: "1 de noviembre de 2026",
  essentials: {
    title: "Lo esencial",
    items: [
      { lead: "Qué es.", text: "Acceso a una red de gimnasios y centros de bienestar mediante créditos, para personas habilitadas por el convenio de su empresa o asociación." },
      { lead: "Quién paga.", text: "Usted paga el 100% de su membresía directamente a ACTIVA. No hay permanencia mínima." },
      { lead: "Renovación.", text: "Su membresía se renueva automáticamente cada mes. Le avisamos antes de cada cobro y puede cancelar cuando quiera." },
      { lead: "Retracto.", text: "Puede desistir de su compra dentro de los ocho días hábiles siguientes, sin dar explicaciones." },
      { lead: "Ciclo pagado protegido.", text: "Si pierde su elegibilidad o termina el convenio, conserva su acceso hasta el final del ciclo que ya pagó." },
      { lead: "Sus derechos.", text: "Nada en estos términos limita sus derechos como consumidor bajo la Ley 7472." },
    ],
    note: "Este resumen facilita la lectura. Las reglas completas están en los términos que siguen.",
  },
  keyData: {
    title: "Datos clave",
    provider: { title: "A. Proveedor", rows: [
      ["Proveedor", "3-102-971466 S.R.L., operadora de ACTIVA"],
      ["Cédula jurídica", "3-102-971466"],
      ["Domicilio", "Cartago, La Unión, San Juan, Condominio Santa Lucía, casa número cuarenta y ocho, Costa Rica"],
      ["Atención y reclamos", "[soporte@4ctiva.com](mailto:soporte@4ctiva.com) · soporte dentro de la aplicación · [+506 7291 6960](tel:+50672916960)"],
    ] },
    plans: { title: "B. Planes y precios", head: ["Plan", "Base mensual", "IVA 13%", "Total mensual", "Créditos por ciclo"], rows: [
      ["Básica", "₡29.900", "₡3.887", "₡33.787", "6"],
      ["Plus", "₡59.900", "₡7.787", "₡67.687", "14"],
    ], note: "El precio que usted paga es siempre el total mensual con IVA incluido. La aplicación muestra el precio vigente antes de cada compra o renovación." },
  },
  termsTitle: "Términos",
  sections: [
    { num: 1, title: "Quiénes somos", clauses: [
      { num: "1.1", text: "ACTIVA es operada por 3-102-971466 S.R.L., que es el proveedor de su membresía. Sus datos de identificación y contacto están en los [Datos Clave](#datos-clave)." },
      { num: "1.2", text: "Usted puede comunicarse con nosotros para consultas, solicitudes y reclamos por el soporte de la aplicación, por [soporte@4ctiva.com](mailto:soporte@4ctiva.com) o al [+506 7291 6960](tel:+50672916960)." },
    ] },
    { num: 2, title: "Qué ofrece ACTIVA", clauses: [
      { num: "2.1", text: "ACTIVA le da acceso a una red de gimnasios, estudios y centros de bienestar (los Centros Afiliados) mediante una membresía y créditos." },
      { num: "2.2", text: "ACTIVA administra la plataforma, su membresía, el cobro, la facturación y el soporte. Cada Centro Afiliado presta directamente las actividades en sus instalaciones." },
      { num: "2.3", text: "El servicio no está abierto al público general. Solo pueden contratarlo las personas habilitadas por un convenio vigente con su empresa o asociación." },
    ] },
    { num: 3, title: "Quién puede registrarse", clauses: [
      { num: "3.1", text: "Para registrarse, usted debe tener dieciocho años cumplidos y cumplir la condición habilitante que defina el convenio vigente con su empresa o asociación." },
      { num: "3.2", text: "En los convenios con asociaciones solidaristas, como ASDECITI, debe ser una persona asociada activa. Ser empleado de la empresa vinculada no basta por sí solo." },
      { num: "3.3", text: "Su empresa o asociación promueve el acceso y confirma su elegibilidad. Usted paga el 100% de su membresía directamente a ACTIVA. El convenio no implica gratuidad, subsidio ni descuento de planilla." },
      { num: "3.4", text: "Su empresa o asociación no acepta estos términos ni autoriza cobros en su nombre. La asociación y la empresa vinculada son entidades distintas." },
    ] },
    { num: 4, title: "Si pierde la elegibilidad o termina el convenio", clauses: [
      { num: "4.1", text: "**Su ciclo pagado está protegido.** Si usted pierde su condición habilitante durante un ciclo ya pagado, conserva su acceso y sus créditos restantes hasta el vencimiento de ese ciclo, con las demás reglas del plan. ACTIVA detiene las renovaciones siguientes." },
      { num: "4.2", text: "La misma protección aplica si termina el convenio entre ACTIVA y su empresa o asociación." },
      { num: "4.3", text: "Como el servicio pagado se mantiene, la pérdida ordinaria de elegibilidad no genera un reembolso automático." },
      { num: "4.4", text: "ACTIVA puede aplicar restricciones justificadas por fraude, suplantación, riesgo de seguridad u otros incumplimientos, conforme a la [sección 14](#seccion-14) y a la ley." },
      { num: "4.5", text: "Si ACTIVA no puede mantener el servicio comprometido, le ofrece el remedio que corresponda conforme a la ley, incluida la devolución proporcional del período no disfrutado." },
    ] },
    { num: 5, title: "Planes y precio total", clauses: [
      { num: "5.1", text: "Antes de contratar, la aplicación le muestra el plan, el precio total con IVA, los créditos, los servicios disponibles, los límites y el período de cobertura." },
      { num: "5.2", text: "Los precios vigentes de esta versión están en los [Datos Clave](#datos-clave)." },
      { num: "5.3", text: "No hay permanencia mínima ni obligación de prepagar los dos meses del piloto. La primera compra cubre un ciclo mensual completo desde la fecha de inicio informada, sin prorrateo." },
      { num: "5.4", text: "Lo que se le cobra coincide siempre con el total que usted aceptó. No se agregan comisiones ni cargos no informados." },
    ] },
    { num: 6, title: "Pago y factura electrónica", clauses: [
      { num: "6.1", text: "El pago se procesa mediante ONVO o el medio que ACTIVA le informe antes de contratar. Su membresía y sus créditos se activan una vez confirmado el pago." },
      { num: "6.2", text: "ACTIVA no recibe los datos completos de su tarjeta. El procesador de pagos los administra, y ACTIVA solo conserva las referencias necesarias para gestionar su suscripción." },
      { num: "6.3", text: "ACTIVA le envía la factura electrónica y la confirmación de su suscripción y pago. La factura identifica el plan, el período cubierto, la base, el IVA y el total." },
      { num: "6.4", text: "Usted debe proporcionar datos de facturación correctos y un correo válido." },
      { num: "6.5", text: "Una demora en la factura no autoriza un segundo cobro. Las devoluciones y correcciones se acompañan de los comprobantes fiscales que correspondan." },
    ] },
    { num: 7, title: "Ciclos y créditos", clauses: [
      { num: "7.1", text: "Cada ciclo comienza en la fecha informada antes del pago y termina el día anterior a la siguiente renovación, en hora de Costa Rica. Por ejemplo: del 15 de septiembre al 14 de octubre, con renovación el 15 de octubre." },
      { num: "7.2", text: "Si el día de inicio no existe en un mes, se usa el último día de ese mes, y el día original se retoma cuando vuelva a existir." },
      { num: "7.3", text: "Los créditos son personales, intransferibles y no tienen valor en efectivo. No se venden, comparten ni canjean por dinero." },
      { num: "7.4", text: "Los créditos no usados vencen al final del ciclo y no se acumulan, salvo lo previsto para una pausa aprobada. Cada renovación pagada otorga los créditos del nuevo ciclo." },
      { num: "7.5", text: "La aplicación le informa el costo en créditos y los límites de cada servicio antes de reservar o ingresar. Rige un máximo general de una visita por día, además de los límites por Centro, servicio o plan. Tener créditos no garantiza cupo en una actividad específica." },
    ] },
    { num: 8, title: "Renovación y cancelación", clauses: [
      { num: "8.1", text: "**Renovación automática.** Al registrarse y pagar, la renovación mensual automática queda activa, con la información y la autorización específica que se le presentan en el proceso de contratación. Usted puede desactivarla en cualquier momento desde Mi plan o solicitarlo a soporte." },
      { num: "8.2", text: "**Aviso antes de cada cobro.** Con al menos diez días naturales de anticipación a cada renovación, ACTIVA le informa el precio total, las fechas del nuevo ciclo y la fecha del cobro." },
      { num: "8.3", text: "**Cancelar es simple.** Usted puede desactivar la renovación en cualquier momento desde Mi plan o escribiendo a [soporte@4ctiva.com](mailto:soporte@4ctiva.com), sin justificar el motivo ni pagar penalidad. Si lo hace antes del siguiente cobro, no se le cobrará." },
      { num: "8.4", text: "Al cancelar la renovación, conserva su acceso hasta el final del ciclo ya pagado. La cancelación no implica por sí sola el reembolso de ese ciclo." },
      { num: "8.5", text: "Si un pago de renovación es rechazado, no se activa un nuevo ciclo hasta que el pago se confirme. El rechazo no afecta el ciclo anterior pagado correctamente." },
      { num: "8.6", text: "**Cambios de precio o condiciones.** ACTIVA le avisa con al menos treinta días naturales de anticipación a la renovación en que apliquen. Si no está de acuerdo, puede cancelar la renovación sin penalidad. Nunca se cambia el precio de un ciclo ya pagado." },
    ] },
    { num: 9, title: "Derecho de retracto", clauses: [
      { num: "9.1", text: "Conforme al artículo 40 de la Ley 7472 y a su reglamento (Decreto Ejecutivo N.° 37899-MEIC), que lo aplican al comercio electrónico, usted puede desistir de su compra dentro de los ocho días hábiles siguientes a la contratación, sin expresar el motivo y sin penalidad." },
      { num: "9.2", text: "Para ejercerlo, basta solicitarlo desde la aplicación o a [soporte@4ctiva.com](mailto:soporte@4ctiva.com)." },
      { num: "9.3", text: "ACTIVA le devuelve lo pagado, incluido el IVA, por el mismo medio de pago y dentro de los siete días hábiles siguientes a su solicitud, con el comprobante fiscal correspondiente, menos el valor proporcional de las visitas efectivamente realizadas en ese período. En el retracto no se retiene ningún cargo de activación ni de gestión." },
    ] },
    { num: 10, title: "Pausa de la membresía", clauses: [
      { num: "10.1", text: "Usted puede solicitar una pausa de un ciclo mensual una vez cada seis meses. La pausa comienza en la siguiente fecha de renovación, y la aplicación le muestra las fechas exactas y las reservas afectadas antes de confirmarla." },
      { num: "10.2", text: "Durante la pausa no se cobra el ciclo suspendido, no se emiten créditos nuevos y no puede reservar ni ingresar." },
      { num: "10.3", text: "La pausa no devuelve el importe del ciclo en curso. Sus créditos elegibles se conservan y restauran según lo que se le informe al confirmar la pausa." },
      { num: "10.4", text: "Para reactivar con un nuevo ciclo pagado, se requiere confirmar el pago y mantener la elegibilidad." },
    ] },
    { num: 11, title: "Reservas, cancelaciones y ausencias", clauses: [
      { num: "11.1", text: "Al confirmar una reserva se retienen los créditos del servicio. Un ingreso válido los consume." },
      { num: "11.2", text: "**Cancelación a tiempo.** Si cancela con al menos doce horas de anticipación para clases, o veinticuatro horas para citas o servicios individuales, sus créditos se liberan y quedan disponibles dentro de su vigencia. La aplicación le muestra el plazo antes de confirmar." },
      { num: "11.3", text: "**Cancelación tardía.** Consume los créditos de la reserva, pero no cuenta como ausencia." },
      { num: "11.4", text: "**Ausencia.** Si no se presenta a una reserva confirmada sin haberla cancelado, se consumen los créditos y se registra una ausencia. No se cobra ninguna multa en dinero." },
      { num: "11.5", text: "La segunda ausencia dentro de treinta días genera una advertencia. La tercera genera una restricción de siete días para hacer nuevas reservas. La restricción no cancela sus reservas existentes." },
      { num: "11.6", text: "Si considera que una ausencia o un consumo de créditos se registró por error, puede pedir su revisión a soporte." },
    ] },
    { num: 12, title: "Cancelaciones del Centro e incidencias", clauses: [
      { num: "12.1", text: "Si un Centro Afiliado cancela su reserva o no puede prestar un servicio confirmado por una causa atribuible al Centro, se le restituyen los créditos y no se registra una ausencia." },
      { num: "12.2", text: "La restitución debe permitirle usar efectivamente el crédito. Si el vencimiento lo impide, soporte le ofrece una solución equivalente o el remedio que corresponda." },
      { num: "12.3", text: "Los Centros administran sus horarios, cupos y reglas de seguridad. ACTIVA puede actualizar su red y le comunica los cambios relevantes. No se garantiza un Centro u horario específico de forma permanente, pero los cambios no eliminan sus derechos ante el incumplimiento de lo contratado." },
      { num: "12.4", text: "La información del catálogo sobre sedes, servicios y amenidades complementa estos términos. Puede consultarla antes de reservar." },
      { num: "12.5", text: "ACTIVA no puede sustituir por créditos, contra su voluntad, un reembolso que legalmente le corresponda." },
    ] },
    { num: 13, title: "Identidad y fotografía de verificación", clauses: [
      { num: "13.1", text: "Su cuenta, reservas, códigos y créditos solo pueden ser usados por usted. El ingreso requiere validar su QR personal vigente y la verificación de identidad que prevé ACTIVA. No comparta su QR ni lo use mediante capturas de pantalla." },
      { num: "13.2", text: "La fotografía se usa para que el personal autorizado del Centro la compare visualmente con usted después de un ingreso validado. ACTIVA no usa reconocimiento facial automatizado ni crea plantillas biométricas." },
      { num: "13.3", text: "El [consentimiento para la fotografía](#consentimiento-de-fotografia) (Anexo B) es específico y separado de la aceptación de estos términos." },
      { num: "13.4", text: "Usted puede retirar ese consentimiento y pedir la eliminación de su fotografía desde la aplicación o por soporte. Sin una fotografía vigente se bloquean los nuevos ingresos y se detiene la próxima renovación. Si incorpora una nueva fotografía y vuelve a consentir, recupera sus ingresos durante el ciclo pagado vigente y la renovación se reactiva automáticamente, salvo que usted la haya cancelado o exista otra causa que la impida." },
      { num: "13.5", text: "El retiro de la fotografía no genera por sí solo una devolución comercial. El período pagado se atiende conforme a la [sección 15](#seccion-15) y a sus derechos legales. Sustituir una fotografía por otra no equivale a retirar el consentimiento." },
    ] },
    { num: 14, title: "Conducta y uso seguro", clauses: [
      { num: "14.1", text: "Usted se compromete a respetar las instrucciones razonables de seguridad, usar responsablemente las instalaciones y tratar con respeto al personal y a las demás personas." },
      { num: "14.2", text: "Le corresponde valorar su capacidad para realizar cada actividad y buscar asesoramiento profesional cuando lo necesite." },
      { num: "14.3", text: "Está prohibido compartir la cuenta, prestar el QR, suplantar identidad, alterar créditos, falsear comprobantes o interferir con el servicio." },
      { num: "14.4", text: "ACTIVA puede investigar y restringir su acceso ante motivos razonables de fraude, seguridad o incumplimiento. Le informa el motivo y le ofrece una vía de revisión, salvo lo necesario para proteger una investigación o cumplir la ley." },
      { num: "14.5", text: "Una restricción no permite cobrarle servicios futuros no autorizados ni negarle devoluciones obligatorias. Usted responde por los daños que legalmente le sean imputables, y no se presume su responsabilidad por desperfectos de un Centro." },
    ] },
    { num: 15, title: "Reembolsos", clauses: [
      { num: "15.1", text: "**Sus derechos legales primero.** Usted tiene derecho a devolución o reparación, sin necesidad de acreditar enfermedad o mudanza, en los casos de retracto ([sección 9](#seccion-9)), cobros duplicados, indebidos o no autorizados, falta de prestación del servicio, incumplimiento y demás derechos irrenunciables. Estas solicitudes se resuelven conforme a la ley." },
      { num: "15.2", text: "**Reembolso voluntario.** Además de lo anterior, usted puede solicitar un reembolso voluntario por cualquier motivo dentro de los primeros quince días naturales de su ciclo, contados en hora de Costa Rica. No se requieren certificados médicos, prueba de mudanza ni otra justificación. Se admite un reembolso voluntario por ciclo, sin que ello limite el retracto, las correcciones de cobros indebidos ni otras devoluciones legalmente obligatorias." },
      { num: "15.3", text: "**Cálculo.** El reembolso se calcula sobre los créditos pagados que usted no haya utilizado, no sobre los días restantes del ciclo: se devuelve la parte del precio del ciclo, antes del IVA, que corresponde a esos créditos, menos un cargo de activación y gestión equivalente al 10% del precio completo del ciclo antes del IVA. Por ejemplo, con un precio de ₡100 antes del IVA y la mitad de los créditos pagados sin usar, se devuelven ₡50 − ₡10 = ₡40, más el IVA correspondiente. Los créditos de cortesía no generan devolución de dinero. Si el cálculo da un valor negativo, se devuelve cero y no se le cobra ninguna diferencia." },
      { num: "15.4", text: "**Durante la solicitud.** Al presentar la solicitud se fija el saldo de créditos para el cálculo y se congelan todos sus créditos, pagados y de cortesía, que no puede usar mientras se resuelve. Se cancelan sus reservas futuras; si una reserva confirmada ya está dentro del plazo de cancelación tardía, sus créditos cuentan como utilizados." },
      { num: "15.5", text: "La devolución se hace por el mismo medio de pago, en la moneda del cobro y dentro de los siete días hábiles siguientes a su solicitud. El IVA que se ajusta es el que se facturó originalmente sobre el importe devuelto, y la devolución se documenta con una nota de crédito electrónica vinculada a la factura original. ACTIVA le comunica el cálculo, los créditos considerados y el efecto sobre su acceso y reservas." },
      { num: "15.6", text: "Una vez validada la solicitud se detienen las renovaciones futuras. Confirmado el reembolso, los saldos de créditos de la membresía quedan en cero y termina su acceso por ese ciclo. Los créditos de cortesía se pierden al confirmarse el reembolso." },
    ] },
    { num: 16, title: "Después del piloto", clauses: [
      { num: "16.1", text: "El piloto inicial dura dos meses. Su finalización no cancela por sí sola su membresía, que continúa en las condiciones aceptadas, con pago íntegro por usted, mientras siga vigente el convenio habilitante y usted mantenga autorizada la renovación." },
      { num: "16.2", text: "Si el convenio termina, aplica la protección del ciclo pagado de la [sección 4](#seccion-4)." },
      { num: "16.3", text: "El fin del piloto no activa ningún financiamiento de su empresa o asociación. Cualquier modalidad posterior requiere información y aceptación separadas. Usted siempre puede detener las renovaciones futuras." },
    ] },
    { num: 17, title: "Solicitudes y reclamos", clauses: [
      { num: "17.1", text: "Usted puede solicitar cancelaciones, devoluciones y correcciones desde la aplicación o en [soporte@4ctiva.com](mailto:soporte@4ctiva.com), indicando la cuenta, el pago o la reserva y el motivo. ACTIVA registra el caso, le pide solo la información necesaria y le comunica su resolución y, si corresponde, el importe y el estado de la devolución." },
      { num: "17.2", text: "Le recomendamos reportar las incidencias de reservas dentro de las setenta y dos horas y los problemas de cobro dentro de los treinta días posteriores al cargo. Son plazos administrativos para facilitar la revisión y no limitan sus derechos ni los plazos legales." },
      { num: "17.3", text: "Si una función de la aplicación no permite presentar su caso, se recibe por el correo de soporte." },
      { num: "17.4", text: "La aprobación de una devolución y su acreditación bancaria son pasos distintos. ACTIVA le informa el envío al procesador y la confirmación recibida, atiende las incidencias y cumple los plazos legales." },
      { num: "17.5", text: "**Autoridades.** En cualquier momento, y sin necesidad de agotar este procedimiento, usted puede acudir a la Comisión Nacional del Consumidor del Ministerio de Economía, Industria y Comercio o a las demás autoridades administrativas y judiciales competentes." },
    ] },
    { num: 18, title: "Datos personales", clauses: [
      { num: "18.1", text: "3-102-971466 S.R.L. trata los datos necesarios para el registro, la elegibilidad, la operación, los pagos, la facturación y la atención de solicitudes, conforme al [Aviso de Privacidad](#aviso-de-privacidad) (Anexo A) y a la Ley 8968. Los consentimientos específicos se piden por separado." },
      { num: "18.2", text: "Su empresa o asociación puede comunicar a ACTIVA su nombre completo, número de identificación y datos de contacto para verificar su identidad y su condición habilitante. Esa verificación no autoriza a entregarle a la entidad su historial de visitas ni sus fotografías." },
      { num: "18.3", text: "El Centro accede únicamente a los datos necesarios para validar y prestar el servicio. ONVO, el proveedor de facturación y los proveedores de infraestructura reciben los datos necesarios para sus funciones." },
      { num: "18.4", text: "Antes de que usted acepte, el [Aviso de Privacidad](#aviso-de-privacidad) le informa los destinatarios, el alojamiento de datos fuera de Costa Rica si lo hay, los plazos de conservación por finalidad y cómo ejercer sus derechos." },
      { num: "18.5", text: "El plazo de cinco años para documentación fiscal no se aplica automáticamente a las fotografías ni a todos los datos de la cuenta." },
      { num: "18.6", text: "Puede ejercer sus derechos de acceso, rectificación, retiro de consentimientos y supresión en [soporte@4ctiva.com](mailto:soporte@4ctiva.com)." },
    ] },
    { num: 19, title: "Responsabilidades", clauses: [
      { num: "19.1", text: "ACTIVA responde por sus obligaciones como proveedor de la membresía y operador de la plataforma. Cada Centro Afiliado responde por sus actividades, instalaciones, personal y medidas de seguridad." },
      { num: "19.2", text: "Reconocer los riesgos propios de una actividad no significa renunciar a reclamar por negligencia o incumplimiento." },
      { num: "19.3", text: "Ninguna disposición de estos términos excluye la responsabilidad que la Ley 7472 impone a ACTIVA y a los Centros frente a usted, ni sus derechos irrenunciables como consumidor." },
    ] },
    { num: 20, title: "Aceptación, versiones y ley aplicable", clauses: [
      { num: "20.1", text: "Usted acepta expresamente la versión que se le presenta antes de contratar. ACTIVA conserva constancia de la versión, la fecha y la cuenta que la aceptó, le envía una copia a su correo y le permite consultar el texto en cualquier momento." },
      { num: "20.2", text: "El [consentimiento de fotografía](#consentimiento-de-fotografia), la autorización de renovación y cualquier otra autorización específica no se sustituyen por la aceptación general de estos términos." },
      { num: "20.3", text: "Los cambios materiales se le comunican con la anticipación de la [sección 8.6](#clausula-8-6) y se someten a nueva aceptación cuando corresponda. Nunca se aplican retroactivamente para reducir sus derechos sobre un ciclo pagado." },
      { num: "20.4", text: "Su empresa o asociación no acepta condiciones ni autoriza cobros en su nombre." },
      { num: "20.5", text: "Estos términos se rigen por la legislación de Costa Rica y no limitan su acceso a las autoridades administrativas o judiciales competentes." },
    ] },
  ],
  annexes: [
    {
      id: "aviso-de-privacidad",
      letter: "A",
      title: "Aviso de Privacidad",
      paragraphs: [
        "Este anexo forma parte de los Términos y Condiciones y desarrolla el tratamiento de datos personales previsto en la [sección 18](#seccion-18), conforme a la Ley 8968.",
        "{{Texto pendiente: responsable del tratamiento, finalidades, datos tratados, destinatarios, alojamiento de datos fuera de Costa Rica si lo hay, plazos de conservación por finalidad y ejercicio de los derechos de acceso, rectificación, retiro del consentimiento y supresión.}}",
      ],
    },
    {
      id: "consentimiento-de-fotografia",
      letter: "B",
      title: "Consentimiento de fotografía",
      paragraphs: [
        "Este anexo forma parte de los Términos y Condiciones y desarrolla el consentimiento específico para la fotografía de verificación previsto en la [sección 13](#seccion-13).",
        "{{Texto pendiente: finalidad de la fotografía, quién puede consultarla, plazo de conservación, cómo retirar el consentimiento o reemplazar la fotografía y sus efectos sobre los ingresos y la renovación.}}",
      ],
    },
  ],
  endMark: "— Fin de los Términos y Condiciones —",
};
