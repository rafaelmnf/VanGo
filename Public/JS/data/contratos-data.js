const contratos = [
    {
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        nomeDoMotorista: "Carlos Oliveira",
        preco: 3000,
        destino: "Rua das Flores, Campinas, SP",
        origem: "Avenida Brasil, São Paulo, SP",
        horarioIda: "08:00",
        horarioVolta: "18:00",
        van: "Fiat Ducato",
        placa: "DEF-1212",
        vaga: 5
    },
    {
        id: "e410293e-6aa0-4b85-b27f-1cbhseb678c6",
        nomeDoMotorista: "Juan Carlos",
        preco: 2300,
        destino: "Rua das Flores, Campinas, SP",
        origem: "Avenida Brasil, São Paulo, SP",
        horarioIda: "08:00",
        horarioVolta: "18:00",
        van: "Mitsubshi",
        placa: "DEF-0000",
        vaga: 5
    },
    {
        id: "e1234ce-6aa0-cd85-b27f-e1d2390678c7",
        nomeDoMotorista: "Rafael Alves",
        preco: 4000,
        destino: "Rua das Flores, Campinas, SP",
        origem: "Avenida Brasil, São Paulo, SP",
        horarioIda: "08:00",
        horarioVolta: "18:00",
        van: "Porsche",
        placa: "312-4def",
        vaga: 5
    },
    {
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        nomeDoMotorista: "João Santos",
        preco: 4000,
        destino: "Rua XV de Novembro, Santos, SP",
        origem: "Rua das Palmeiras, Sorocaba, SP",
        horarioIda: "09:00",
        horarioVolta: "19:00",
        van: "Renault Master",
        placa: "GHI-8910",
        vaga: 2
    },
    {
        id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        nomeDoMotorista: "Lucas Pereira",
        preco: 2500,
        destino: "Avenida Paulista, São Paulo, SP",
        origem: "Rua do Comércio, Piracicaba, SP",
        horarioIda: "07:00",
        horarioVolta: "17:00",
        van: "Volkswagen Crafter",
        placa: "JKL-1123",
        vaga: 8
    },
    {
        id: "54e0eccd-8f36-462b-b68a-8182611d9add",
        nomeDoMotorista: "Marcelo Souza",
        preco: 3200,
        destino: "Rua Boa Vista, Campinas, SP",
        origem: "Rua General Osório, Ribeirão Preto, SP",
        horarioIda: "06:30",
        horarioVolta: "16:30",
        van: "Mercedes-Benz Vito",
        placa: "MNO-3456",
        vaga: 6
    },
    {
        id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
        nomeDoMotorista: "Rafael Lima",
        preco: 4500,
        destino: "Rua da Consolação, São Paulo, SP",
        origem: "Avenida Itavuvu, Sorocaba, SP",
        horarioIda: "08:30",
        horarioVolta: "18:30",
        van: "Ford Transit",
        placa: "PQR-7890",
        vaga: 2
    },
    {
        id: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
        nomeDoMotorista: "Fernando Silva",
        preco: 3800,
        destino: "Avenida São João, Jundiaí, SP",
        origem: "Rua Sete de Setembro, Campinas, SP",
        horarioIda: "07:15",
        horarioVolta: "17:15",
        van: "Hyundai H350",
        placa: "STU-1011",
        vaga: 4
    },
    {
        id: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
        nomeDoMotorista: "Gabriel Araújo",
        preco: 2900,
        destino: "Rua Augusta, São Paulo, SP",
        origem: "Rua Barão de Limeira, São José do Rio Preto, SP",
        horarioIda: "08:45",
        horarioVolta: "18:45",
        van: "Peugeot Boxer",
        placa: "VWX-1314",
        vaga: 7
    },
    {
        id: "77919bbe-0e56-475b-adde-4f24dfed3a04",
        nomeDoMotorista: "Fábio Alves",
        preco: 3400,
        destino: "Avenida Dom Pedro II, São Caetano do Sul, SP",
        origem: "Rua José Paulino, Campinas, SP",
        horarioIda: "09:30",
        horarioVolta: "19:30",
        van: "Citroën Jumper",
        placa: "YZA-1516",
        vaga: 6
    },
    {
        id: "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
        nomeDoMotorista: "André Melo",
        preco: 3100,
        destino: "Avenida João Dias, São Paulo, SP",
        origem: "Rua Rui Barbosa, São José dos Campos, SP",
        horarioIda: "06:45",
        horarioVolta: "16:45",
        van: "Iveco Daily",
        placa: "BCD-1718",
        vaga: 5
    },
    {
        id: "58b4fc92-e98c-42aa-8c55-b6b79996769a",
        nomeDoMotorista: "Pedro Nunes",
        preco: 3700,
        destino: "Rua do Rosário, Santos, SP",
        origem: "Rua Coronel Souza, Limeira, SP",
        horarioIda: "07:00",
        horarioVolta: "17:00",
        van: "Toyota Hiace",
        placa: "EFG-1920",
        vaga: 3
    },
    {
        id: "5968897c-4d27-4872-89f6-5bcb052746d7",
        nomeDoMotorista: "Diego Rocha",
        preco: 2800,
        destino: "Avenida Nove de Julho, Ribeirão Preto, SP",
        origem: "Rua São Bento, São Paulo, SP",
        horarioIda: "08:15",
        horarioVolta: "18:15",
        van: "Chevrolet Express",
        placa: "HIJ-2122",
        vaga: 4
    },
    {
        id: "aad29d11-ea98-41ee-9285-b916638cac4a",
        nomeDoMotorista: "Bruno Matos",
        preco: 2300,
        destino: "Avenida das Nações Unidas, São Paulo, SP",
        origem: "Rua Prudente de Moraes, Americana, SP",
        horarioIda: "07:30",
        horarioVolta: "17:30",
        van: "Nissan NV350",
        placa: "KLM-2324",
        vaga: 8
    },
    {
        id: "04701903-bc79-49c6-bc11-1af7e3651358",
        nomeDoMotorista: "Thiago Batista",
        preco: 4200,
        destino: "Avenida Getúlio Vargas, Campinas, SP",
        origem: "Rua Santa Luzia, Pirassununga, SP",
        horarioIda: "06:00",
        horarioVolta: "16:00",
        van: "Mitsubishi L300",
        placa: "NOP-2526",
        vaga: 11
    },
    {
        id: "901eb2ca-386d-432e-82f0-6fb1ee7bf969",
        nomeDoMotorista: "Gustavo Costa",
        preco: 3600,
        destino: "Rua Oscar Freire, São Paulo, SP",
        origem: "Avenida Padre Anchieta, Guarujá, SP",
        horarioIda: "08:20",
        horarioVolta: "18:20",
        van: "Kia Bongo",
        placa: "QRS-2728",
        vaga: 12
    },
    {
        id: "82bb68d7-ebc9-476a-989c-c78a40ee5cd9",
        nomeDoMotorista: "Henrique Barros",
        preco: 2900,
        destino: "Rua Vergueiro, São Paulo, SP",
        origem: "Avenida Senador Vergueiro, São Bernardo do Campo, SP",
        horarioIda: "07:50",
        horarioVolta: "17:50",
        van: "LDV Maxus",
        placa: "TUV-2920",
        vaga: 9
    },
    {
        id: "c2a82c5e-aff4-435f-9975-517cfaba2ece",
        nomeDoMotorista: "Victor Ramos",
        preco: 3100,
        destino: "Avenida dos Autonomistas, Osasco, SP",
        origem: "Rua São Francisco, Barueri, SP",
        horarioIda: "09:00",
        horarioVolta: "19:00",
        van: "Ram Promaster",
        placa: "WXZ-3132",
        vaga: 1
    },
    {
        id: "8ae432b6-2b7e-4c21-bd85-9c0b7659b123",
        nomeDoMotorista: "Marcos Vinicius",
        preco: 3900,
        destino: "Rua dos Andradas, Porto Alegre, RS",
        origem: "Avenida Borges de Medeiros, Porto Alegre, RS",
        horarioIda: "07:20",
        horarioVolta: "17:20",
        van: "Sprinter Mercedes",
        placa: "OPQ-2020",
        vaga: 2
    },
    {
        id: "1b23cd56-8d76-4f50-9834-a89dc781f6ab",
        nomeDoMotorista: "Sandra Regina",
        preco: 4100,
        destino: "Praça da Sé, São Paulo, SP",
        origem: "Avenida Paulista, São Paulo, SP",
        horarioIda: "09:00",
        horarioVolta: "19:00",
        van: "Volkswagen Transporter",
        placa: "XYZ-3535",
        vaga: 3
    },
];
