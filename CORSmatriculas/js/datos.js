
// Cuando se pide con ?alumnos=TODOS se devuelve TODOS_ALUMNOS
// con \n como separador de registros y punto y coma como separador de campos
// El primer registro contiene el nombre de los campos
const TODOS_ALUMNOS = `Matrícula;Nombre;Apellido1;Apellido2;Sexo;Nif;Correo
DAA0001;Francisco José;Bernad;Llamas;H;40324766Q;daa0001@correo.net
DAA0002;María Ángeles;Rodríguez;Rojas;M;69234503H;daa0002@correo.net
DAA0003;José Manuel;Álvaro;Domingo;H;55479616M;daa0003@correo.net
DAA0004;María Dolores;Chico;Vicente;M;10057100M;daa0004@correo.net
DAA0005;Carmen;Toledo;Serrano;M;51773361Q;daa0005@correo.net
DAA0006;Antonio;Pedraza;Álvarez;H;21525879H;daa0006@correo.net
DAA0007;Antonio;Andrés;López;H;60310627G;daa0007@correo.net
DAA0008;Cristina;Román;Barrera;M;16739207Z;daa0008@correo.net
DAA0009;Francisco;Ramos;Manso;H;98842535N;daa0009@correo.net
`;

// Cuando se pide ?alumno=correo se devuelve el alumno cuyo correo coincida con el pedido
const ALUMNOS = [
  {
    "Matrícula": "DAA0001",
    "Nombre": "Francisco José",
    "Apellido1": "Bernad",
    "Apellido2": "Llamas",
    "Sexo": "H",
    "Nif": "40324766Q",
    "Correo": "daa0001@correo.net"
  },
  {
    "Matrícula": "DAA0002",
    "Nombre": "María Ángeles",
    "Apellido1": "Rodríguez",
    "Apellido2": "Rojas",
    "Sexo": "M",
    "Nif": "69234503H",
    "Correo": "daa0002@correo.net"
  },
  {
    "Matrícula": "DAA0003",
    "Nombre": "José Manuel",
    "Apellido1": "Álvaro",
    "Apellido2": "Domingo",
    "Sexo": "H",
    "Nif": "55479616M",
    "Correo": "daa0003@correo.net"
  },
  {
    "Matrícula": "DAA0004",
    "Nombre": "María Dolores",
    "Apellido1": "Chico",
    "Apellido2": "Vicente",
    "Sexo": "M",
    "Nif": "10057100M",
    "Correo": "daa0004@correo.net"
  },
  {
    "Matrícula": "DAA0005",
    "Nombre": "Carmen",
    "Apellido1": "Toledo",
    "Apellido2": "Serrano",
    "Sexo": "M",
    "Nif": "51773361Q",
    "Correo": "daa0005@correo.net"
  },
  {
    "Matrícula": "DAA0006",
    "Nombre": "Antonio",
    "Apellido1": "Pedraza",
    "Apellido2": "Álvarez",
    "Sexo": "H",
    "Nif": "21525879H",
    "Correo": "daa0006@correo.net"
  },
  {
    "Matrícula": "DAA0007",
    "Nombre": "Antonio",
    "Apellido1": "Andrés",
    "Apellido2": "López",
    "Sexo": "H",
    "Nif": "60310627G",
    "Correo": "daa0007@correo.net"
  },
  {
    "Matrícula": "DAA0008",
    "Nombre": "Cristina",
    "Apellido1": "Román",
    "Apellido2": "Barrera",
    "Sexo": "M",
    "Nif": "16739207Z",
    "Correo": "daa0008@correo.net"
  },
  {
    "Matrícula": "DAA0009",
    "Nombre": "Francisco",
    "Apellido1": "Ramos",
    "Apellido2": "Manso",
    "Sexo": "H",
    "Nif": "98842535N",
    "Correo": "daa0009@correo.net"
  }
 ];

// Cuando se pide ?alumno=matricula se devuelve el alumno y nota cuya matrícula coincida con la pedida
 const NOTAS = [
  [ 
    { "Matrícula": "DAA0001", "Nombre": "Francisco José", "Apellido1": "Bernad", "Apellido2": "Llamas", "Sexo": "H", "Nif": "40324766Q", "Correo": "daa0001@correo.net" },
    { "Matrícula": "DAA0001", "Módulo 1": 20, "Módulo 2": 50, "Módulo 3": 60, "Módulo 4": 10 }
  ],
  [
    { "Matrícula": "DAA0002", "Nombre": "María Ángeles", "Apellido1": "Rodríguez", "Apellido2": "Rojas", "Sexo": "M", "Nif": "69234503H", "Correo": "daa0002@correo.net" },
    { "Matrícula": "DAA0002", "Módulo 1": 35, "Módulo 2": 50, "Módulo 3": 60, "Módulo 4": 70 }
  ],
  [
    { "Matrícula": "DAA0003", "Nombre": "José Manuel", "Apellido1": "Álvaro", "Apellido2": "Domingo", "Sexo": "H", "Nif": "55479616M", "Correo": "daa0003@correo.net" },
    { "Matrícula": "DAA0003", "Módulo 1": 90, "Módulo 2": 80, "Módulo 3": 70, "Módulo 4": 100 }
  ],
  [
    { "Matrícula": "DAA0004", "Nombre": "María Dolores","Apellido1": "Chico","Apellido2": "Vicente","Sexo": "M","Nif": "10057100M","Correo": "daa0004@correo.net"},
    { "Matrícula": "DAA0004","Módulo 1": 10,"Módulo 2": 40,"Módulo 3": 80,"Módulo 4": 63 }
  ],
  [
    { "Matrícula": "DAA0005", "Nombre": "Carmen", "Apellido1": "Toledo", "Apellido2": "Serrano", "Sexo": "M", "Nif": "51773361Q", "Correo": "daa0005@correo.net" },
    { "Matrícula": "DAA0005", "Módulo 1": 85, "Módulo 2": 56, "Módulo 3": 66, "Módulo 4": 71 }
  ],
  [
    { "Matrícula": "DAA0006", "Nombre": "Antonio", "Apellido1": "Pedraza", "Apellido2": "Álvarez", "Sexo": "H", "Nif": "21525879H", "Correo": "daa0006@correo.net" },
    { "Matrícula": "DAA0006", "Módulo 1": 67, "Módulo 2": 50, "Módulo 3": 46, "Módulo 4": 52  }
  ],
  [
    { "Matrícula": "DAA0007", "Nombre": "Antonio", "Apellido1": "Andrés", "Apellido2": "López", "Sexo": "H", "Nif": "60310627G", "Correo": "daa0007@correo.net" },
    { "Matrícula": "DAA0007", "Módulo 1": 76, "Módulo 2": 58, "Módulo 3": 69, "Módulo 4": 97  }
  ],
  [
    { "Matrícula": "DAA0008", "Nombre": "Cristina", "Apellido1": "Román", "Apellido2": "Barrera", "Sexo": "M", "Nif": "16739207Z", "Correo": "daa0008@correo.net" },
    { "Matrícula": "DAA0008", "Módulo 1": 15, "Módulo 2": 50, "Módulo 3": 60, "Módulo 4": 52 }
  ],
  [ 
    { "Matrícula": "DAA0009", "Nombre": "Francisco", "Apellido1": "Ramos", "Apellido2": "Manso", "Sexo": "H", "Nif": "98842535N", "Correo": "daa0009@correo.net"  }, 
    { "Matrícula": "DAA0009", "Módulo 1": 58, "Módulo 2": 45, "Módulo 3": 91, "Módulo 4": 89 }
  ]
 ];
