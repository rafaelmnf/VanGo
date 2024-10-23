





// ANIMAÇÃO DAS IMAGENS AMOSTRA DE ROLAMENTO LATERAL

const track = document.getElementById("image-track");
const message1 = document.getElementById("sobre-message1");
const message2 = document.getElementById("sobre-message2");

window.onmousedown = (e) => {
  track.dataset.mouseDownAt = e.clientX;
};

window.onmousemove = (e) => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
  const maxDelta = window.innerWidth / 2;
  const percentage = (mouseDelta / maxDelta) * -100;
  let nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

  nextPercentage = Math.max(Math.min(nextPercentage, 0), -100);

  track.dataset.percentage = nextPercentage;

  // Lógica para exibir/ocultar as mensagens
  if (nextPercentage > -15) {
    message1.classList.remove("invisible");
    message2.classList.add("invisible");

  } else if (nextPercentage < -85) {
    message2.classList.remove("invisible");
    message2.classList.add("visible")
    message1.classList.add("invisible");

  } else {
    message2.classList.remove("visible")
    message1.classList.add("invisible");
    message2.classList.add("invisible");
  }

  track.animate(
    {
      transform: `translate(${nextPercentage}%, -50%)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of track.getElementsByClassName("image")) {
    image.animate(
      {
        objectPosition: `${100 + nextPercentage}% center`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};

window.onmouseup = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};



// ANIMAÇÃO DE TEXTO APARECER 

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log(entry);
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  });
  
  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach((el) => observer.observe(el));

  const hiddenElementsL = document.querySelectorAll('.hiddenL');
hiddenElementsL.forEach((el) => observer.observe(el));

const hiddenElementsR = document.querySelectorAll('.hiddenR');
hiddenElementsR.forEach((el) => observer.observe(el));





// SISTEMA DE ENVIO DE EMAIL PARA ATUALIZAR A PÁGINA

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('loginForm');
    const verificationLogin = document.getElementById('verificationLogin');

    // Inicialmente esconde o formulário de verificação
    verificationLogin.style.display = 'none';

    // Submeter formulário de contato
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        

        try {
            // Envia a requisição para o servidor
            const response = await fetch('/send-verification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });

            const result = await response.json();

            if (response.ok) {
                // Esconde o formulário de contato e exibe o de verificação
                loginForm.style.display = 'none';
                verificationLogin.style.display = 'block';
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Erro ao enviar o e-mail:', error);
        }
    });

    // Submeter formulário de verificação
    verificationLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value; // Email original
        const code = document.getElementById('verificationCode').value;

        try {
            const response = await fetch('/verify-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, code })
            });

            const result = await response.json();

            if (response.ok) {
                // Após a verificação bem-sucedida, envia a mensagem original
                await fetch('/send-message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({senha, email })
                });
                alert('Mensagem enviada com sucesso!');
                window.location.reload();
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Erro ao verificar o código:', error);
        }
    });
});