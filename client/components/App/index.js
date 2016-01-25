import ComponentHeader from 'components/Header';
import ComponentMainSection from 'components/MainSection';

export default React.createClass({

    displayName: 'App',

    render: function () {
        return (
            <div className="app">
                <ComponentHeader />
                <ComponentMainSection />
            </div>
        );
    }

});
