const moment = require('moment');

function generateTimeString(time) {
  if (!moment.isMoment(time)) {
    time = moment(time);
  }
  time = moment.duration(moment().diff(time));

  let msg = '';
  const years = time.years();
  const months = time.months();
  const days = time.days();
  const hours = time.hours();
  const minutes = time.minutes();
  const seconds = time.seconds();

  if (years > 0) msg += `${years} an${years != 1 ? 's': ''}, `;
  if (months > 0) msg += `${months} mois, `;
  if (days > 0) msg += `${days} jour${days != 1 ? 's' : ''}, `;
  if (hours > 0) msg += `${hours} heure${hours != 1 ? 's' : ''}, `;
  if (minutes > 0) msg += `${minutes} minute${minutes != 1 ? 's' : ''}, `;
  msg += `${seconds} seconde${seconds > 1 ? 's' : ''}`;

  return msg;
}

async function clean (text) {
  const zeroWidthSpace = String.fromCharCode(8203);
  if (text && text.constructor.name === 'Promise') text = await text;

  if (typeof text !== 'string')
    text = require('util').inspect(text, { depth: 1 });

  text = text
    .replace(/`/g, `\`${zeroWidthSpace}`) // escape code
    .replace(/@/g, `@${zeroWidthSpace}`) // escape mention
    .replace(process.env.CLIENT_SECRET, '<secret>') // remove secret
    .replace(process.env.CLIENT_TOKEN, '<token>'); // remove token

  return text;
};

module.exports = {
  generateTimeString,
  clean
};
