function toMoney(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

function generateData(opts) {
  const { initial, rate, years, investment } = opts;
  let amount = initial;
  const monthly = 1 + ((rate / 12) / 100);

  for(let i = 0; i < years * 12; i ++) {
    amount = (amount + investment) * monthly;
  }

  const totalInvestments = years * 12 * investment;
  const totalInterest = amount - totalInvestments;

  result.innerHTML = `After <b>${years}</b> years, \your initial investment of \
  <b>${toMoney(initial)}</b> would be worth <b>${toMoney(amount)}</b>. <br /><br /> \
  This would be comprised of <b>${toMoney(totalInvestments)}</b> of monthly investments
  and <b>${toMoney(totalInterest)}</b> worth of accumlated interest`;
}

function coerce(data) {
  const value = parseInt(data);
  if(isNaN(value)) {
    console.error(value);
    throw new Error('stop being cheeky');
  }

  return value;
}

calculate.onclick = function() {
  generateData({
    initial: coerce(initial.value),
    rate: coerce(rate.value),
    years: coerce(years.value),
    investment: coerce(investment.value),
  });
}
