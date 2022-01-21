import Notiflix from "notiflix";

const refs = {
  form: document.querySelector('form'),
};

refs.form.addEventListener('submit', onBtnSubmit);

let position = 0;
function onBtnSubmit(elevent) {
  elevent.preventDefault();
  let delay = Number(elevent.currentTarget.delay.value);
  let step = Number(elevent.currentTarget.step.value);
  let amount = Number(elevent.currentTarget.amount.value);

  setInterval(() => {
    if (position === amount) {
      return;
    }
    position += 1;
    
      
   createPromise(position, delay)
     .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
     .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  }, step)
    
}
function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setInterval(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(({ position, delay }));
      }
      reject(({ position, delay }));
    }, delay);
 
  });
  return promise;
};
