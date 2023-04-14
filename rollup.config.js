import path from 'path';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

const input = './src/index.ts';
const external = ['react', 'react-dom'];
const outputName = 'rdkk-component-library';
const outputFile = 'dist/index.js';

export default {
  input,
  external,
  output: [
    {
      file: outputFile,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      plugins: [terser()],
    },
    {
      file: `dist/${outputName}.esm.js`,
      format: 'esm',
      exports: 'named',
      sourcemap: true,
    },
    {
      name: outputName,
      file: `dist/${outputName}.umd.js`,
      format: 'umd',
      exports: 'named',
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
      plugins: [terser()],
    },
  ],
  plugins: [
    postcss({
      extract: path.resolve('./dist/styles.css'),
      modules: false,
    }),
  ],
};
