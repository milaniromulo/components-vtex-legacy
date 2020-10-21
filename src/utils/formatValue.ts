const formatValue = (value: number): string => {
  if (value.toString().length < 3) {
    return 'R$' + ' ' + value;
  }

  let formatedValue = value.toString();
  formatedValue =
    formatedValue.substring(0, formatedValue.length - 2) +
    ',' +
    formatedValue.substring(formatedValue.length - 2);

  return 'R$' + ' ' + formatedValue;
};

export default formatValue;
