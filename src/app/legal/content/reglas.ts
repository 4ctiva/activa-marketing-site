// Based on "ACTIVA_Reglas_de_Negocio_Borrador.docx" (Versión de trabajo 2026-10-07), published as the final
// document: the internal working layer is omitted (draft notes, Control codes, "Pendientes", references to the
// non-public Aliados/ASDECITI contracts, internal files) and the open items were closed by ACTIVA on 2026-10-08
// (renewal notice, refund formula, retracto, versions). Inline markup: see RichText.tsx.
import type { RulesDoc } from "../model";

export const REGLAS: RulesDoc = {
  title: "Reglas de Negocio de ACTIVA",
  version: "2026-10-08",
  effective: "1 de noviembre de 2026",
  intro: "Estas Reglas de Negocio desarrollan las materias operativas de los [Términos y Condiciones](/legal/terminos/), del contrato de Centros Afiliados y del convenio de empresa o asociación, y forman parte de ellos.",
  operator: { title: "Operador", rows: [
    ["Operador", "3-102-971466 S.R.L."],
    ["Cédula jurídica", "3-102-971466"],
    ["Domicilio", "Cartago, La Unión, San Juan, Condominio Santa Lucía, casa número cuarenta y ocho"],
    ["Atención y notificaciones", "[soporte@4ctiva.com](mailto:soporte@4ctiva.com)"],
    ["Teléfono", "[+506 7291 6960](tel:+50672916960)"],
  ] },
  topics: [
    {
      code: "RN 01",
      title: "Elegibilidad y protección del ciclo pagado",
      termsRefs: [{ kind: "essentials" }, { kind: "clauses", from: "3.1", to: "3.4" }, { kind: "clauses", from: "4.1", to: "4.5" }, { kind: "clauses", from: "16.2", to: "16.2" }],
      clauses: [
        { num: "1.1", text: "Para el convenio con ASDECITI, el acceso se limita a sus asociados activos que cumplan los requisitos del convenio y de los [Términos](/legal/terminos/). La asociación participa en promoción y verificación de elegibilidad. La pertenencia a una empresa no habilita por sí sola a quien no pertenezca al grupo definido en el convenio." },
        { num: "1.2", text: "Si el miembro pierde elegibilidad después de haber pagado y activado su membresía, conserva acceso, créditos restantes, reservas e ingresos hasta finalizar ese ciclo. Las renovaciones futuras se detienen mientras siga inelegible. Las demás reglas de uso, seguridad y vencimiento continúan aplicándose." },
        { num: "1.3", text: "Desde la fecha efectiva de terminación del convenio, no se admiten nuevas inscripciones, activaciones ni renovaciones bajo ese convenio. Las membresías ya pagadas y activas pueden utilizarse hasta que termine su ciclo." },
        { num: "1.4", text: "El Centro valida la autorización de ingreso proporcionada por ACTIVA. La verificación de pertenencia a la asociación o empresa se gestiona conforme al convenio, sin trasladarla informalmente al personal del Centro." },
      ],
    },
    {
      code: "RN 02",
      title: "Compra, activación, pago y factura",
      termsRefs: [{ kind: "clauses", from: "5.1", to: "5.4" }, { kind: "clauses", from: "6.1", to: "6.5" }, { kind: "clauses", from: "15.5", to: "15.5" }],
      clauses: [
        { num: "2.1", text: "Durante el piloto, el miembro paga el 100% de su membresía por adelantado. La empresa o asociación no financia ni recauda ese pago. Una modalidad futura de financiamiento empresarial requiere su habilitación y las condiciones que correspondan." },
        { num: "2.2", text: "Antes del pago se informa el precio de la membresía, los impuestos aplicables, el total, el ciclo y los créditos incluidos. El pago confirmado y la activación dan lugar a la membresía correspondiente. La factura electrónica y el correo comercial de confirmación son documentos distintos." },
        { num: "2.3", text: "El cargo de activación y gestión se identifica en la factura electrónica como un servicio separado, con su base imponible y el IVA correspondiente, cuando se trate de un servicio sujeto al IVA conforme a la Ley N.° 9635. El porcentaje se calcula sobre el precio antes del IVA." },
        { num: "2.4", text: "Las devoluciones o correcciones se documentan con una nota de crédito electrónica vinculada a la factura original, que indica el comprobante que se modifica y el motivo. El IVA que se ajusta es exactamente el que se facturó originalmente sobre el importe que se revierte. Un cargo conservado válidamente no se revierte solo porque se devuelva otro concepto." },
      ],
    },
    {
      code: "RN 03",
      title: "Confirmación por correo y copias aceptadas",
      termsRefs: [{ kind: "clauses", from: "6.3", to: "6.3" }, { kind: "clauses", from: "20.1", to: "20.3" }],
      clauses: [
        { num: "3.1", text: "Una vez confirmado el pago y activada la membresía, ACTIVA envía un correo propio al miembro. Incluye la membresía adquirida, monto pagado, fecha del pago, inicio y fin del ciclo, créditos, estado real de renovación automática, próxima fecha de cobro cuando corresponda y referencia de la transacción." },
        { num: "3.2", text: "El correo adjunta un PDF de la versión exacta de los Términos aceptados. Un enlace a una página que cambia con el tiempo no sustituye este adjunto." },
        { num: "3.3", text: "ACTIVA conserva la identificación de quien aceptó, la versión, la fecha y hora y la membresía relacionada. El texto histórico aceptado se preserva sin sobrescribirlo. Esta conservación del texto no establece conservación ilimitada de todos los datos personales." },
        { num: "3.4", text: "La versión de las Reglas de Negocio vigente al momento de la aceptación se identifica y se conserva junto con el contrato, y puede consultarse en cualquier momento." },
      ],
    },
    {
      code: "RN 04",
      title: "Renovación, cancelación y avisos",
      termsRefs: [{ kind: "essentials" }, { kind: "clauses", from: "8.1", to: "8.6" }, { kind: "clauses", from: "20.2", to: "20.3" }],
      clauses: [
        { num: "4.1", text: "Al registrarse y pagar, la renovación automática queda activa, con la información y la autorización específica que se presentan en el proceso de contratación. El miembro puede desactivarla desde su perfil o solicitar la gestión a soporte." },
        { num: "4.2", text: "ACTIVA avisa la renovación con diez días naturales de anticipación e informa el precio total, inicio y fin del nuevo ciclo y fecha del cobro. Los cambios de precio o condiciones se avisan con treinta días naturales de anticipación; no se aplican antes de cumplir ese plazo ni alteran el precio del ciclo ya pagado." },
        { num: "4.3", text: "Una cancelación válida anterior al siguiente cobro detiene renovaciones futuras sin exigir un plazo mínimo adicional y conserva el uso del ciclo ya pagado. ACTIVA corrige los cargos posteriores indebidos." },
        { num: "4.4", text: "Una solicitud de reembolso validada detiene futuras renovaciones sin esperar a que se acredite el dinero. La mera recepción de una solicitud aún no validada no produce por sí sola ese efecto. El congelamiento de créditos desde la solicitud se regula en [RN 09](#rn-09)." },
      ],
    },
    {
      code: "RN 05",
      title: "Fotografía, identidad y medios de ingreso",
      termsRefs: [{ kind: "clauses", from: "13.1", to: "13.5" }, { kind: "section", section: 18 }, { kind: "clauses", from: "20.2", to: "20.2" }],
      clauses: [
        { num: "5.1", text: "La fotografía de perfil es necesaria para registrarse y para verificar la identidad al ingresar a los Centros. La validación de ingreso puede utilizar un QR o un código temporal personal vigente. Ambos requieren fotografía." },
        { num: "5.2", text: "Antes de retirar la foto se advierte que, sin ella, se bloquea la generación de QR y código temporal y se suspende la renovación y su cobro." },
        { num: "5.3", text: "Al incorporar otra foto se levanta automáticamente la restricción de renovación causada por su ausencia, sin una nueva autorización por ese único motivo. Ello no anula una cancelación expresa ni un bloqueo por reembolso válido, inelegibilidad u otra causa aplicable." },
        { num: "5.4", text: "El uso de la foto se limita a la verificación de identidad autorizada y se regula en el [consentimiento específico](/legal/terminos/#consentimiento-de-fotografia) y el [Aviso de Privacidad](/legal/terminos/#aviso-de-privacidad). El Centro la consulta dentro del flujo autorizado; no la copia ni reutiliza para otros fines." },
      ],
    },
    {
      code: "RN 06",
      title: "Reservas y estados de créditos",
      termsRefs: [{ kind: "clauses", from: "7.3", to: "7.5" }, { kind: "clauses", from: "11.1", to: "11.1" }],
      clauses: [
        { num: "6.1", text: "Una solicitud pendiente de aprobación no equivale a una reserva confirmada. La modalidad del Centro determina cuándo se confirma el cupo y cuándo se retienen los créditos; esa información debe estar disponible antes de reservar." },
        { num: "6.2", text: "Los créditos retenidos quedan apartados para esa reserva y no están disponibles para otro uso. La retención no equivale a consumo. El ingreso válidamente confirmado consume los créditos correspondientes." },
        { num: "6.3", text: "En reservas nativas de la plataforma, la retención puede producirse desde la solicitud. En la modalidad asistida por WhatsApp, la solicitud pendiente no implica por sí sola que haya cupo o créditos retenidos; la confirmación del aliado genera la reserva y la retención correspondiente." },
        { num: "6.4", text: "Si una solicitud aún no aprobada se cancela o rechaza, se libera cualquier retención sin penalización por tardanza, incluso dentro de la ventana de 12 o 24 horas. Las sanciones de tardanza y ausencia se aplican a reservas confirmadas." },
        { num: "6.5", text: "Los créditos son personales y no se transfieren ni venden. Su consideración en el cálculo de un reembolso de membresía no crea un derecho independiente a canjearlos por dinero." },
      ],
    },
    {
      code: "RN 07",
      title: "Cancelaciones, ausencias y sanciones",
      termsRefs: [{ kind: "clauses", from: "11.2", to: "11.6" }, { kind: "clauses", from: "12.1", to: "12.2" }],
      clauses: [
        { num: "7.1", text: "Cancelar una clase con al menos doce horas de anticipación o una cita o servicio individual con al menos veinticuatro horas libera los créditos. Cancelar exactamente en el límite se considera a tiempo. Se informa la fecha y hora exactas del corte en hora de Costa Rica." },
        { num: "7.2", text: "Una cancelación posterior al corte de una reserva confirmada consume los créditos correspondientes, sin sumar una ausencia. Se conserva la excepción de solicitudes no aprobadas de [RN 06](#rn-06)." },
        { num: "7.3", text: "La ausencia a una reserva confirmada consume los créditos y cuenta para las sanciones por ausencias. La segunda ausencia dentro de treinta días genera advertencia; la tercera restringe durante siete días las nuevas reservas, conservando las ya existentes. No se aplica multa monetaria." },
        { num: "7.4", text: "Si el Centro cancela o no presta el servicio por una causa que le corresponda, se restituyen los créditos conforme al contrato y no se registra una ausencia del miembro. Los errores pueden reportarse a soporte. El tratamiento efectivo de créditos que ya no puedan usarse por vencimiento se coordina conforme a la obligación del contrato." },
        { num: "7.5", text: "El consumo de un crédito por tardanza o ausencia no constituye por sí mismo una Visita Válida para liquidar al Centro. Tampoco determina automáticamente que haya servicio recibido para un retracto legal." },
      ],
    },
    {
      code: "RN 08",
      title: "Reembolso voluntario: acceso y alcance",
      termsRefs: [{ kind: "clauses", from: "7.3", to: "7.3" }, { kind: "clauses", from: "15.2", to: "15.5" }, { kind: "clauses", from: "17.1", to: "17.1" }],
      clauses: [
        { num: "8.1", text: "El miembro puede solicitar un reembolso voluntario por cualquier motivo dentro de los primeros quince días naturales de su ciclo, contados en hora de Costa Rica. No se requieren certificados médicos, prueba de mudanza ni distancia mínima de las ubicaciones." },
        { num: "8.2", text: "Se admite un reembolso voluntario por ciclo. Esta limitación no restringe el retracto, las correcciones de cobros indebidos ni otras devoluciones legalmente obligatorias." },
        { num: "8.3", text: "El cálculo utiliza créditos pagados no utilizados y no los días restantes. Los créditos de cortesía no generan devolución de dinero. Si el cálculo arroja un valor negativo, se devuelve cero y no se cobra una diferencia adicional." },
        { num: "8.4", text: "Del importe que corresponde a los créditos pagados no utilizados se descuenta un cargo de activación y gestión equivalente al 10% del precio completo del ciclo antes del IVA. Por ejemplo, con un precio de ₡100 antes del IVA y la mitad de los créditos pagados sin usar, se devuelven ₡50 − ₡10 = ₡40, más el IVA correspondiente." },
        { num: "8.5", text: "La solicitud se tramita con ACTIVA a través de la aplicación o soporte. La devolución se hace por el mismo medio de pago y dentro de los siete días hábiles siguientes a la solicitud. El Centro y la asociación no deciden ni prometen el reembolso. El Centro puede orientar al miembro hacia los canales de ACTIVA." },
      ],
    },
    {
      code: "RN 09",
      title: "Solicitud de reembolso: congelamiento, reservas y cierre",
      termsRefs: [{ kind: "clauses", from: "8.3", to: "8.3" }, { kind: "clauses", from: "15.4", to: "15.6" }, { kind: "clauses", from: "17.1", to: "17.4" }],
      clauses: [
        { num: "9.1", text: "Al presentar la solicitud de reembolso voluntario se fija el saldo para el cálculo y se congelan todos los créditos, pagados y de cortesía. El miembro no puede seguir utilizándolos mientras se resuelve la solicitud." },
        { num: "9.2", text: "Se cancelan las reservas futuras y se liberan sus créditos para el cálculo cuando corresponda. Si una reserva confirmada ya está dentro de la ventana de cancelación tardía, sus créditos cuentan como utilizados. Una solicitud no aprobada conserva la excepción de [RN 06](#rn-06)." },
        { num: "9.3", text: "Los créditos de cortesía se excluyen del valor reembolsable, permanecen congelados y se pierden cuando se confirma el reembolso." },
        { num: "9.4", text: "Una vez validada la solicitud se detienen renovaciones futuras. Confirmado el reembolso, todos los saldos de créditos de la membresía quedan en cero y termina el derecho de acceso. No se conserva una parte de los créditos después de recibir la devolución." },
        { num: "9.5", text: "El reembolso al miembro no elimina automáticamente el pago debido al Centro por Visitas Válidas ya prestadas; cada relación se liquida conforme a su contrato." },
      ],
    },
    {
      code: "RN 10",
      title: "Retracto y devoluciones legales",
      termsRefs: [{ kind: "essentials" }, { kind: "clauses", from: "9.1", to: "9.3" }, { kind: "clauses", from: "15.1", to: "15.1" }],
      clauses: [
        { num: "10.1", text: "ACTIVA reconoce el retracto y las devoluciones legalmente exigibles. Se tratan por separado del reembolso voluntario y no están sujetos al límite de quince días, al límite de un reembolso por ciclo, al cargo del 10% ni a la fórmula por créditos." },
        { num: "10.2", text: "Conforme al artículo 40 de la Ley 7472 y a su reglamento, el retracto puede ejercerse dentro de los ocho días hábiles siguientes a la contratación. ACTIVA devuelve lo pagado, incluido el IVA, por el mismo medio de pago y dentro de los siete días hábiles siguientes a la solicitud, menos el valor proporcional de las visitas efectivamente realizadas. En el retracto no se retiene el cargo de activación y gestión." },
      ],
    },
    {
      code: "RN 11",
      title: "Liquidación y pago a Centros",
      termsRefs: [],
      clauses: [
        { num: "11.1", text: "ACTIVA paga las liquidaciones de los Centros por transferencia bancaria o SINPE manual a los datos verificados del Centro. ONVO no ejecuta estos pagos y el panel de ACTIVA no sustituye la transferencia." },
        { num: "11.2", text: "La tarifa pactada por visita incluye IVA según el acuerdo comercial con cada Centro. Por ejemplo, una tarifa acordada de ₡7.000 es un total de ₡7.000, cuyo desglose fiscal debe corresponder a la factura del proveedor; no se añade otro IVA sobre ese total." },
        { num: "11.3", text: "El importe estimado del panel se concilia con las Visitas Válidas y las tarifas pactadas. Las correcciones por errores deben comunicarse, justificarse y conservar evidencia. La estimación no permite desconocer importes legítimamente debidos ni modificar tarifas a discreción." },
        { num: "11.4", text: "La parte no controvertida se paga en el plazo acordado, aunque otras partidas se revisen. El calendario, la moneda, los datos de pago y el procedimiento de diferencias se definen para cada Centro en su contrato." },
        { num: "11.5", text: "Cada liquidación distingue factura, ajustes, pagos, comprobantes y saldo. Las comisiones que ONVO cobre a ACTIVA por procesamiento o liquidación no se descuentan de la tarifa pactada al Centro. Las retenciones tributarias, cuando sean legalmente exigibles, requieren fundamento y respaldo contable." },
      ],
    },
    {
      code: "RN 12",
      title: "Privacidad y límites de datos",
      termsRefs: [{ kind: "section", section: 13 }, { kind: "clauses", from: "18.1", to: "18.6" }, { kind: "clauses", from: "20.2", to: "20.2" }],
      clauses: [
        { num: "12.1", text: "Los datos se utilizan conforme a las finalidades y autorizaciones informadas. Para verificar la elegibilidad se contempla el intercambio de nombre completo y cédula entre la asociación y ACTIVA, a través del canal seguro y con la base jurídica que establece el convenio." },
        { num: "12.2", text: "No se solicitan certificados médicos ni pruebas de mudanza para el reembolso voluntario. Ello no define el tratamiento independiente de datos de salud que un Centro pudiera requerir para sus propios servicios." },
        { num: "12.3", text: "La fotografía se utiliza para la verificación de identidad y requiere su consentimiento específico. La empresa o asociación no recibe fotografías ni historial individual de visitas; el Centro accede solo a lo necesario dentro del flujo autorizado." },
        { num: "12.4", text: "La conservación de documentación fiscal y la conservación de información personal se definen por finalidad. La referencia de cinco años comunicada para documentos fiscales no se extiende automáticamente a fotografías ni a todos los datos personales. El [Aviso de Privacidad](/legal/terminos/#aviso-de-privacidad) indica los plazos y las excepciones aplicables." },
      ],
    },
    {
      code: "RN 13",
      title: "Versiones, incorporación y precedencia",
      termsRefs: [{ kind: "header" }, { kind: "essentials" }, { kind: "clauses", from: "20.1", to: "20.5" }],
      clauses: [
        { num: "13.1", text: "Estas Reglas de Negocio forman parte integrante de los Términos y Condiciones y de los contratos correspondientes. Cada versión se identifica por su fecha y está disponible antes de la aceptación." },
        { num: "13.2", text: "Las Reglas de Negocio complementan los Términos y Condiciones y se aplican junto con ellos, sin desplazar las normas legales obligatorias." },
        { num: "13.3", text: "Los enlaces públicos llevan a una versión identificada y a un tema concreto. Una modificación posterior genera una nueva versión, con los avisos y las aceptaciones aplicables, y el texto anterior se mantiene accesible." },
      ],
    },
  ],
};
