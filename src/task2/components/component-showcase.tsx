import { useTheme } from "../context/theme-context"
import Button from "./Button"
import Card from "./Card"
import './component-showcase.scss'

export const ComponentShowcase = () => {
    const { toggleTheme, isDark } = useTheme();

    return (
        <div className="showcase">
            <header className="showcase-header">
                <h1>Component Library</h1>
                <Button variant="secondary" onClick={toggleTheme}>
                    {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </Button>
            </header>

            {/* Cards Section */}
            <section className="showcase-section">
                <h2>Cards</h2>
                <div className="component-list component-list--column">
                    {/* Basic Card */}
                    <Card title="Simple Card">
                        This is a basic card with some content inside.
                    </Card>

                    {/* Card with variants */}
                    <Card title="Elevated Card" variant="elevated">
                        This card has a shadow effect.
                    </Card>

                    <Card title="Outlined Card" variant="outlined">
                        This card has a border instead of shadow.
                    </Card>

                    <Card title="Flat Card" variant="flat">
                        This card has no border or shadow.
                    </Card>

                    {/* Card with footer */}
                    <Card
                        title="Card with Footer"
                        footer={<Button variant="primary" size="small">Learn More</Button>}
                    >
                        This card has a footer section with a button.
                    </Card>

                    {/* Hoverable Card */}
                    <Card
                        title="Clickable Card"
                        hoverable
                        onClick={() => alert('Card clicked!')}
                    >
                        Hover over me or click me!
                    </Card>

                    {/* Card without title */}
                    <Card variant="outlined">
                        A card without a title works too!
                    </Card>
                </div>
            </section>

            {/* Buttons Section */}
            <section className="showcase-section">
                <h2>Buttons</h2>

                {/* Variants */}
                <div className="button-group">
                    <h3>Variants</h3>
                    <div className="component-list component-list--row">
                        <Button variant="primary" onClick={() => console.log('Primary clicked')}>
                            Primary Button
                        </Button>

                        <Button variant="secondary" onClick={() => console.log('Secondary clicked')}>
                            Secondary Button
                        </Button>

                        <Button variant="danger" onClick={() => console.log('Danger clicked')}>
                            Delete Button
                        </Button>
                    </div>
                </div>

                {/* Sizes */}
                <div className="button-group">
                    <h3>Sizes</h3>
                    <div className="component-list component-list--row">
                        <Button variant="primary" size="small">
                            Small Button
                        </Button>

                        <Button variant="primary" size="medium">
                            Medium Button
                        </Button>

                        <Button variant="primary" size="large">
                            Large Button
                        </Button>
                    </div>
                </div>

                {/* States */}
                <div className="button-group">
                    <h3>States</h3>
                    <div className="component-list component-list--row">
                        <Button variant="primary">
                            Active Button
                        </Button>

                        <Button variant="primary" disabled>
                            Disabled Button
                        </Button>

                        <Button variant="secondary" disabled>
                            Disabled Secondary
                        </Button>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="button-group">
                    <h3>Form Actions</h3>
                    <div className="component-list component-list--row">
                        <Button variant="primary" onClick={() => alert('Form submitted!')}>
                            Submit
                        </Button>

                        <Button variant="secondary" onClick={() => alert('Form cancelled')}>
                            Cancel
                        </Button>

                        <Button variant="secondary" onClick={() => alert('Form reset')}>
                            Reset
                        </Button>
                    </div>
                </div>

                {/* CRUD Operations */}
                <div className="button-group">
                    <h3>CRUD Operations</h3>
                    <div className="component-list component-list--row">
                        <Button variant="primary" size="small" onClick={() => console.log('Creating...')}>
                            Create New
                        </Button>

                        <Button variant="secondary" size="small" onClick={() => console.log('Editing...')}>
                            Edit
                        </Button>

                        <Button variant="danger" size="small" onClick={() => console.log('Deleting...')}>
                            Delete
                        </Button>
                    </div>
                </div>

                {/* Navigation */}
                <div className="button-group">
                    <h3>Navigation</h3>
                    <div className="component-list component-list--row">
                        <Button variant="secondary" size="small">
                            Back
                        </Button>

                        <Button variant="primary">
                            Continue
                        </Button>

                        <Button variant="secondary" size="small">
                            Skip
                        </Button>
                    </div>
                </div>

                {/* Call to Actions */}
                <div className="button-group">
                    <h3>Call to Actions</h3>
                    <div className="component-list component-list--row">
                        <Button variant="primary" size="large">
                            Get Started
                        </Button>

                        <Button variant="primary" size="large">
                            Sign Up Free
                        </Button>

                        <Button variant="secondary" size="large">
                            Learn More
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}