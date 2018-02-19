/*
This function uses something called a "promise".
They're important in modern JavaScript, but this
is the only one needed in this entire program,
so I decided to skip covering them and just give
you this one. You can learn more about them online.
*/
async function getBase64(url) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(url);
  });
}