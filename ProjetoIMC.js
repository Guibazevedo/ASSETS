function calcular() {
        var idade = document.getElementById('idade').value;
        var peso = document.getElementById('peso').value;
        var altura = document.getElementById('altura').value;

        if (idade && peso && altura) {
            var imc = peso / ((altura / 100) * (altura / 100));

            var planosA = calcularPlanosOperadoraA(idade, imc);
            var planosB = calcularPlanosOperadoraB(imc);

            var valores = [
                { nome: 'Básico', valor: planosA.basico, operadora: 'Operadora A' },
                { nome: 'Standard', valor: planosA.standard, operadora: 'Operadora A' },
                { nome: 'Premium', valor: planosA.premium, operadora: 'Operadora A' },
                { nome: 'Básico', valor: planosB.basico, operadora: 'Operadora B' },
                { nome: 'Standard', valor: planosB.standard, operadora: 'Operadora B' },
                { nome: 'Premium', valor: planosB.premium, operadora: 'Operadora B' }
            ];

            valores = valores.filter(function(plano) {
                return plano.valor >= 0;
            });

            valores.sort(function(a, b) {
                return a.valor - b.valor;
            });

            var maisBaratoGeral = valores.length > 0 ? valores[0] : null;

            document.getElementById('basicoA').innerText = trancarNumero(planosA.basico);
            document.getElementById('standardA').innerText = trancarNumero(planosA.standard);
            document.getElementById('premiumA').innerText = trancarNumero(planosA.premium);

            document.getElementById('basicoB').innerText = trancarNumero(planosB.basico);
            document.getElementById('standardB').innerText = trancarNumero(planosB.standard);
            document.getElementById('premiumB').innerText = trancarNumero(planosB.premium);

            if (maisBaratoGeral) {
                document.getElementById('maisBaratoNome').innerText = maisBaratoGeral.nome;
                document.getElementById('maisBaratoValor').innerText = trancarNumero(maisBaratoGeral.valor);
                document.getElementById('maisBaratoOperadora').innerText = maisBaratoGeral.operadora;
            } else {
                document.getElementById('maisBaratoNome').innerText = '';
                document.getElementById('maisBaratoValor').innerText = '';
                document.getElementById('maisBaratoOperadora').innerText = '';
            }

            document.getElementById('resultado').classList.remove('hidden');

            function trancarNumero(numero) {
                return Math.floor(numero * 100) / 100;
            }
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    }

    function calcularPlanosOperadoraA(idade, imc) {
        var basico = 100 + (idade * 10 * (imc / 10));
        var standard = (150 + (idade * 15)) * (imc / 10);
        var premium = (200 - (imc * 10) + (idade * 20)) * (imc / 10);

        return {
            basico: basico,
            standard: standard,
            premium: premium
        };
    }

    function calcularPlanosOperadoraB(imc) {
        var fatorDeComorbidade;

        if (imc < 18.5) {
            fatorDeComorbidade = 10;
        } else if (imc >= 18.5 && imc < 25) {
            fatorDeComorbidade = 1;
        } else if (imc >= 25 && imc < 30) {
            fatorDeComorbidade = 6;
        } else if (imc >= 30 && imc < 35) {
            fatorDeComorbidade = 10;
        } else if (imc >= 35 && imc < 40) {
            fatorDeComorbidade = 20;
        } else {
            fatorDeComorbidade = 30;
        }
        var basico = 100 + (fatorDeComorbidade * 10 * (imc / 10));
        var standard = (150 + (fatorDeComorbidade * 15)) * (imc / 10);
        var premium = (200 - (imc * 10) + (fatorDeComorbidade * 20)) * (imc / 10);

        return {
            basico: basico,
            standard: standard,
            premium: premium
        };
    }