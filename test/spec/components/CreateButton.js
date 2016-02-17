import CreateButton from 'components/CreateButton';
import TodoActions from 'actions/TodoActions';
import TestUtils from 'react-addons-test-utils';
import styles from 'components/CreateButton/CreateButton.styl';

describe('Component CreateButton', () => {

    beforeEach(function() {
        this.sinon.stub(TodoActions, 'createItem');
    });

    it('should exists', function() {
        const component = TestUtils.renderIntoDocument(<CreateButton />);

        expect(TestUtils.isCompositeComponent(component)).to.be.equal(true);
    });

    it('should call action of create by clicking on the button', function() {
        const component = TestUtils.renderIntoDocument(<CreateButton />);

        TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(component, styles.common));

        expect(TodoActions.createItem).to.have.callCount(1);
    });

});
