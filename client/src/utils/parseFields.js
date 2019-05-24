import endpoints from './endpoints';

export default {
    parseData(data, endpoint) {
      let myData = data;
      let names = Object.keys(myData);
      let fields = endpoints.squashFields(endpoint);
      names.forEach(name => {
        if (fields[name]) {
          if (fields[name].type === 'date') {
            myData[name] = removeDashes(myData[name]);
          }

        }
      });
      return myData;
    },
    formatData(data, endpoint) {
      let myData = data;
      let names = Object.keys(myData);
      let fields = endpoints.squashFields(endpoint);
      names.forEach(name => {
        if (fields[name]) {
          if (fields[name].type === 'date') {
            myData[name] = formatUTC(myData[name]);
          }
          if (name === 'tags') {
            myData[name] = flattenTags(myData[name]);
          }
        }
      });
      return myData;
    }
}

// {categoryB: [b], categoryA: [a] } => [a, b]
function flattenTags(categories) {
  if (!categories || Array.isArray(categories)) return categories;
  let tags = [];
  Object.keys(categories).forEach(key => {
    categories[key].forEach(tag => {
      tags.push(tag);
    });
  });
  return tags;
}

function removeDashes(date) {
  if (!date || date.length !== 10) return;
  let myDate = date;
  myDate = myDate.replace(/-/g, '');
  return myDate;
}

// Expected yyyymmdd
function formatUTC(utc) {
  if (!utc) return;
  let d = new Date(utc),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
}