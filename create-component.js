const fs = require('fs');
const path = require('path');

const componentName = process.argv.slice(2)[0];
const dirName = process.argv.slice(2)[1];

if (componentName) {
  const pathName = path.join(__dirname, dirName ?? '', componentName);
  const reactComponentContent = `import { FC } from 'react';

import styles from './${componentName}.module.scss';

interface ${componentName}Props {}

const ${componentName}: FC<${componentName}Props> = () => {
  return <div className={styles.root}></div>
}

export default ${componentName};`;

  fs.mkdir(pathName, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log('📁 Directory created successfully!');
  });

  try {
    fs.writeFileSync(path.join(pathName, `${componentName}.tsx`), reactComponentContent);
    console.log('⭐️ Component created successfully!');
  } catch (e) {
    return console.error(e);
  }
  try {
    fs.writeFileSync(path.join(pathName, `${componentName}.module.scss`), '');
    console.log('💅 Styles created successfully!');
  } catch (e) {
    return console.error(e);
  }
} else {
  return console.log('\x1b[31m', 'Please, add name for component');
}
