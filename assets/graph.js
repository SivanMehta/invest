function toMoney(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

function generateData(opts) {
  const { initial, rate, years, investment, dividend } = opts;
  let amount = initial;
  const monthly = 1 + ((rate / 12) / 100);
  let dividends = 0;

  for (let i = 0; i < years * 12; i ++) {
    const dividendContribution = amount * ((dividend / 12) / 100);
    dividends += dividendContribution;
    let totalContribution = investment + dividendContribution;
    amount = (amount + totalContribution) * monthly;
  }

  const totalInvestments = years * 12 * investment + initial;
  const totalInterest = amount - totalInvestments;

  result.innerHTML = `After <b>${years}</b> years, \your initial investment of \
  <b>${toMoney(initial)}</b> would be worth <b>${toMoney(amount)}</b>. <br /><br /> \
  This would be comprised of <b>${toMoney(totalInvestments)}</b> of manual investments
  , <b>${toMoney(totalInterest)}</b> worth of accumulated interest, and <b>${toMoney(dividends)}</b> \
  of reinvested dividends`;
}

function coerce(data) {
  const value = parseFloat(data);
  if(isNaN(value) || value < 0) {
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
    dividend: coerce(dividend.value)
  });
}
