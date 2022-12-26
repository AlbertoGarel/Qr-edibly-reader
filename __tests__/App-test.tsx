import renderer from 'react-test-renderer';
import App from "../src/App";
test('renders App.tsx correctly', ()=>{
    const tree = renderer.create("App").toJSON();
    expect(tree).toMatchSnapshot();
})