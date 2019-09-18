"use strict";
// tslint:disable-next-line
// const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ config }) => {
    config.module.rules.push({
        loader: require.resolve('awesome-typescript-loader'),
        test: /\.(ts|tsx)$/,
    });
    // config.plugins.push(new TSDocgenPlugin()); // optional
    config.resolve.extensions.push('.ts', '.tsx');
    config.resolve.alias['react-native$'] = require.resolve('react-native-web');
    config.resolve.alias['react-art$'] = require.resolve('react-art');
    return config;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicGFjay5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3Rvcnlib29rL3dlYnBhY2suY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwyQkFBMkI7QUFDM0IsNEVBQTRFOztBQUU1RSxrQkFBZSxDQUFDLEVBQUUsTUFBTSxFQUFPLEVBQUUsRUFBRTtJQUVsQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDeEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsMkJBQTJCLENBQUM7UUFDcEQsSUFBSSxFQUFFLGFBQWE7S0FDbkIsQ0FBQyxDQUFDO0lBRUgseURBQXlEO0lBRXpELE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFOUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzVFLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFbEUsT0FBTyxNQUFNLENBQUM7QUFDZixDQUFDLENBQUMifQ==