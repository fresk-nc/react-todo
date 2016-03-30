import Button from 'components/Button';
import { shallow } from 'enzyme';

function setup(props) {
    const component = shallow(
        <Button type={props.type} onClick={props.onClick}>{props.children}</Button>
    );

    return {
        component,
        children: component.children()
    };
}

describe('Button component', () => {

    it('should render children', () => {
        const { children } = setup({ type: 'round', children: 'Test Children' });

        expect(children.text()).to.be.equal('Test Children');
    });

    it('should call callback by clicking on the button', () => {
        const onClick = sinon.spy();
        const { component } = setup({ type: 'round', onClick: onClick });

        component.simulate('click');
        expect(onClick).to.have.callCount(1);
    });

});
