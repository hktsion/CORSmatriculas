
// Cuando se pide con ?alumnos=TODOS se devuelve TODOS_ALUMNOS
// con \n como separador de registros y punto y coma como separador de campos
// El primer registro contiene el nombre de los campos
const TODOS_ALUMNOS = `Matr�cula;Nombre;Apellido1;Apellido2;Sexo;Nif;Correo
DAA0001;Francisco Jos�;Bernad;Llamas;H;40324766Q;daa0001@correo.net
DAA0002;Mar�a �ngeles;Rodr�guez;Rojas;M;69234503H;daa0002@correo.net
DAA0003;Jos� Manuel;�lvaro;Domingo;H;55479616M;daa0003@correo.net
DAA0004;Mar�a Dolores;Chico;Vicente;M;10057100M;daa0004@correo.net
DAA0005;Carmen;Toledo;Serrano;M;51773361Q;daa0005@correo.net
DAA0006;Antonio;Pedraza;�lvarez;H;21525879H;daa0006@correo.net
DAA0007;Antonio;Andr�s;L�pez;H;60310627G;daa0007@correo.net
DAA0008;Cristina;Rom�n;Barrera;M;16739207Z;daa0008@correo.net
DAA0009;Francisco;Ramos;Manso;H;98842535N;daa0009@correo.net
`;

// Cuando se pide ?alumno=correo se devuelve el alumno cuyo correo coincida con el pedido
const ALUMNOS = [
  {
    "Matr�cula": "DAA0001",
    "Nombre": "Francisco Jos�",
    "Apellido1": "Bernad",
    "Apellido2": "Llamas",
    "Sexo": "H",
    "Nif": "40324766Q",
    "Correo": "daa0001@correo.net"
  },
  {
    "Matr�cula": "DAA0002",
    "Nombre": "Mar�a �ngeles",
    "Apellido1": "Rodr�guez",
    "Apellido2": "Rojas",
    "Sexo": "M",
    "Nif": "69234503H",
    "Correo": "daa0002@correo.net"
  },
  {
    "Matr�cula": "DAA0003",
    "Nombre": "Jos� Manuel",
    "Apellido1": "�lvaro",
    "Apellido2": "Domingo",
    "Sexo": "H",
    "Nif": "55479616M",
    "Correo": "daa0003@correo.net"
  },
  {
    "Matr�cula": "DAA0004",
    "Nombre": "Mar�a Dolores",
    "Apellido1": "Chico",
    "Apellido2": "Vicente",
    "Sexo": "M",
    "Nif": "10057100M",
    "Correo": "daa0004@correo.net"
  },
  {
    "Matr�cula": "DAA0005",
    "Nombre": "Carmen",
    "Apellido1": "Toledo",
    "Apellido2": "Serrano",
    "Sexo": "M",
    "Nif": "51773361Q",
    "Correo": "daa0005@correo.net"
  },
  {
    "Matr�cula": "DAA0006",
    "Nombre": "Antonio",
    "Apellido1": "Pedraza",
    "Apellido2": "�lvarez",
    "Sexo": "H",
    "Nif": "21525879H",
    "Correo": "daa0006@correo.net"
  },
  {
    "Matr�cula": "DAA0007",
    "Nombre": "Antonio",
    "Apellido1": "Andr�s",
    "Apellido2": "L�pez",
    "Sexo": "H",
    "Nif": "60310627G",
    "Correo": "daa0007@correo.net"
  },
  {
    "Matr�cula": "DAA0008",
    "Nombre": "Cristina",
    "Apellido1": "Rom�n",
    "Apellido2": "Barrera",
    "Sexo": "M",
    "Nif": "16739207Z",
    "Correo": "daa0008@correo.net"
  },
  {
    "Matr�cula": "DAA0009",
    "Nombre": "Francisco",
    "Apellido1": "Ramos",
    "Apellido2": "Manso",
    "Sexo": "H",
    "Nif": "98842535N",
    "Correo": "daa0009@correo.net"
  }
 ];

// Cuando se pide ?alumno=matricula se devuelve el alumno y nota cuya matr�cula coincida con la pedida
 const NOTAS = [
  [ 
    { "Matr�cula": "DAA0001", "Nombre": "Francisco Jos�", "Apellido1": "Bernad", "Apellido2": "Llamas", "Sexo": "H", "Nif": "40324766Q", "Correo": "daa0001@correo.net" },
    { "Matr�cula": "DAA0001", "M�dulo 1": 20, "M�dulo 2": 50, "M�dulo 3": 60, "M�dulo 4": 10 }
  ],
  [
    { "Matr�cula": "DAA0002", "Nombre": "Mar�a �ngeles", "Apellido1": "Rodr�guez", "Apellido2": "Rojas", "Sexo": "M", "Nif": "69234503H", "Correo": "daa0002@correo.net" },
    { "Matr�cula": "DAA0002", "M�dulo 1": 35, "M�dulo 2": 50, "M�dulo 3": 60, "M�dulo 4": 70 }
  ],
  [
    { "Matr�cula": "DAA0003", "Nombre": "Jos� Manuel", "Apellido1": "�lvaro", "Apellido2": "Domingo", "Sexo": "H", "Nif": "55479616M", "Correo": "daa0003@correo.net" },
    { "Matr�cula": "DAA0003", "M�dulo 1": 90, "M�dulo 2": 80, "M�dulo 3": 70, "M�dulo 4": 100 }
  ],
  [
    { "Matr�cula": "DAA0004", "Nombre": "Mar�a Dolores","Apellido1": "Chico","Apellido2": "Vicente","Sexo": "M","Nif": "10057100M","Correo": "daa0004@correo.net"},
    { "Matr�cula": "DAA0004","M�dulo 1": 10,"M�dulo 2": 40,"M�dulo 3": 80,"M�dulo 4": 63 }
  ],
  [
    { "Matr�cula": "DAA0005", "Nombre": "Carmen", "Apellido1": "Toledo", "Apellido2": "Serrano", "Sexo": "M", "Nif": "51773361Q", "Correo": "daa0005@correo.net" },
    { "Matr�cula": "DAA0005", "M�dulo 1": 85, "M�dulo 2": 56, "M�dulo 3": 66, "M�dulo 4": 71 }
  ],
  [
    { "Matr�cula": "DAA0006", "Nombre": "Antonio", "Apellido1": "Pedraza", "Apellido2": "�lvarez", "Sexo": "H", "Nif": "21525879H", "Correo": "daa0006@correo.net" },
    { "Matr�cula": "DAA0006", "M�dulo 1": 67, "M�dulo 2": 50, "M�dulo 3": 46, "M�dulo 4": 52  }
  ],
  [
    { "Matr�cula": "DAA0007", "Nombre": "Antonio", "Apellido1": "Andr�s", "Apellido2": "L�pez", "Sexo": "H", "Nif": "60310627G", "Correo": "daa0007@correo.net" },
    { "Matr�cula": "DAA0007", "M�dulo 1": 76, "M�dulo 2": 58, "M�dulo 3": 69, "M�dulo 4": 97  }
  ],
  [
    { "Matr�cula": "DAA0008", "Nombre": "Cristina", "Apellido1": "Rom�n", "Apellido2": "Barrera", "Sexo": "M", "Nif": "16739207Z", "Correo": "daa0008@correo.net" },
    { "Matr�cula": "DAA0008", "M�dulo 1": 15, "M�dulo 2": 50, "M�dulo 3": 60, "M�dulo 4": 52 }
  ],
  [ 
    { "Matr�cula": "DAA0009", "Nombre": "Francisco", "Apellido1": "Ramos", "Apellido2": "Manso", "Sexo": "H", "Nif": "98842535N", "Correo": "daa0009@correo.net"  }, 
    { "Matr�cula": "DAA0009", "M�dulo 1": 58, "M�dulo 2": 45, "M�dulo 3": 91, "M�dulo 4": 89 }
  ]
 ];
