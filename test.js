import {h, build, renderToString, Color} from 'ink';
import {spy} from 'sinon';
import figures from 'figures';
import test from 'ava';
import SelectInput, {Indicator, Item} from '.';

test('indicator', t => {
	t.is(renderToString(<Indicator/>), ' ');
});

test('indicator - selected', t => {
	t.is(renderToString(<Indicator isSelected/>), renderToString((
		<Color blue>
			{`${figures.pointer} `}
		</Color>
	)));
});

test('item', t => {
	t.is(renderToString(<Item label="Test"/>), 'Test');
});

test('item - selected', t => {
	t.is(renderToString(<Item isSelected label="Test"/>), renderToString((
		<Color blue>
			Test
		</Color>
	)));
});

test('list', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}];

	t.is(renderToString(<SelectInput items={items}/>), renderToString((
		<span>
			<div>
				<Indicator isSelected/>
				<Item isSelected label="First"/>
			</div>

			<div>
				<Indicator/>
				<Item label="Second"/>
			</div>
		</span>
	)));
});

test('list - custom indicator', t => {
	const items = [{
		label: 'Test',
		value: 'test'
	}];

	const CustomIndicator = () => 'X ';

	t.is(renderToString(<SelectInput items={items} indicatorComponent={CustomIndicator}/>), renderToString((
		<span>
			<div>
				<CustomIndicator/>
				<Item isSelected label="Test"/>
			</div>
		</span>
	)));
});

test('list - custom item', t => {
	const items = [{
		label: 'Test',
		value: 'test'
	}];

	const CustomItem = ({label}) => `- ${label}`;

	t.is(renderToString(<SelectInput items={items} itemComponent={CustomItem}/>), renderToString((
		<span>
			<div>
				<Indicator isSelected/>
				<CustomItem label="Test"/>
			</div>
		</span>
	)));
});

test('list - ignore keypress if not focused', t => {
	const setRef = spy();

	build(<SelectInput ref={setRef} focus={false}/>);

	const [ref] = setRef.firstCall.args;
	spy(ref, 'setState');

	ref.handleKeyPress('', {
		name: 'up'
	});

	t.false(ref.setState.called);
});

test('list - move up with up key', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}];

	const setRef = spy();

	build(<SelectInput ref={setRef} items={items}/>);

	const [ref] = setRef.firstCall.args;
	spy(ref, 'setState');

	ref.state = {
		rotateIndex: 0,
		selectedIndex: 1
	};

	ref.handleKeyPress('', {
		name: 'up'
	});

	t.true(ref.setState.calledOnce);
	t.deepEqual(ref.setState.firstCall.args[0], {
		rotateIndex: 0,
		selectedIndex: 0
	});
});

test('list - move up with k key', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}];

	const setRef = spy();

	build(<SelectInput ref={setRef} items={items}/>);

	const [ref] = setRef.firstCall.args;
	spy(ref, 'setState');

	ref.state = {
		rotateIndex: 0,
		selectedIndex: 1
	};

	ref.handleKeyPress('', {
		name: 'k'
	});

	t.true(ref.setState.calledOnce);
	t.deepEqual(ref.setState.firstCall.args[0], {
		rotateIndex: 0,
		selectedIndex: 0
	});
});

test('list - move to the end with up key', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}];

	const setRef = spy();

	build(<SelectInput ref={setRef} items={items}/>);

	const [ref] = setRef.firstCall.args;
	spy(ref, 'setState');

	ref.handleKeyPress('', {
		name: 'up'
	});

	t.true(ref.setState.calledOnce);
	t.deepEqual(ref.setState.firstCall.args[0], {
		rotateIndex: 1,
		selectedIndex: 1
	});
});

test('list - move to the end with k key', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}];

	const setRef = spy();

	build(<SelectInput ref={setRef} items={items}/>);

	const [ref] = setRef.firstCall.args;
	spy(ref, 'setState');

	ref.handleKeyPress('', {
		name: 'k'
	});

	t.true(ref.setState.calledOnce);
	t.deepEqual(ref.setState.firstCall.args[0], {
		rotateIndex: 1,
		selectedIndex: 1
	});
});

test('list - move down with down key', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}];

	const setRef = spy();

	build(<SelectInput ref={setRef} items={items}/>);

	const [ref] = setRef.firstCall.args;
	spy(ref, 'setState');

	ref.handleKeyPress('', {
		name: 'down'
	});

	t.true(ref.setState.calledOnce);
	t.deepEqual(ref.setState.firstCall.args[0], {
		rotateIndex: 0,
		selectedIndex: 1
	});
});

test('list - move down with j key', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}];

	const setRef = spy();

	build(<SelectInput ref={setRef} items={items}/>);

	const [ref] = setRef.firstCall.args;
	spy(ref, 'setState');

	ref.handleKeyPress('', {
		name: 'j'
	});

	t.true(ref.setState.calledOnce);
	t.deepEqual(ref.setState.firstCall.args[0], {
		rotateIndex: 0,
		selectedIndex: 1
	});
});

test('list - move to the beginning with down key', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}];

	const setRef = spy();

	build(<SelectInput ref={setRef} items={items}/>);

	const [ref] = setRef.firstCall.args;
	spy(ref, 'setState');

	ref.state = {
		rotateIndex: 0,
		selectedIndex: 1
	};

	ref.handleKeyPress('', {
		name: 'down'
	});

	t.true(ref.setState.calledOnce);
	t.deepEqual(ref.setState.firstCall.args[0], {
		rotateIndex: -1,
		selectedIndex: 0
	});
});

test('list - move to the beginning with j key', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}];

	const setRef = spy();

	build(<SelectInput ref={setRef} items={items}/>);

	const [ref] = setRef.firstCall.args;
	spy(ref, 'setState');

	ref.state = {
		rotateIndex: 0,
		selectedIndex: 1
	};

	ref.handleKeyPress('', {
		name: 'j'
	});

	t.true(ref.setState.calledOnce);
	t.deepEqual(ref.setState.firstCall.args[0], {
		rotateIndex: -1,
		selectedIndex: 0
	});
});

test('list - reset selection on new items', t => {
	const firstItems = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}];

	const secondItems = [{
		label: 'Third',
		value: 'third'
	}, {
		label: 'Fourth',
		value: 'fourth'
	}];

	const setRef = spy();

	build(<SelectInput ref={setRef} items={firstItems}/>);

	const [ref] = setRef.firstCall.args;
	spy(ref, 'setState');

	ref.state = {
		rotateIndex: 1,
		selectedIndex: 1
	};

	ref.componentWillReceiveProps({
		items: secondItems
	});

	t.true(ref.setState.calledOnce);
	t.deepEqual(ref.setState.firstCall.args[0], {
		rotateIndex: 0,
		selectedIndex: 0
	});
});

test('list - limit', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}];

	t.is(renderToString(<SelectInput items={items} limit={1}/>), renderToString((
		<span>
			<div>
				<Indicator isSelected/>
				<Item isSelected label="First"/>
			</div>
		</span>
	)));
});

test('list - onSelect with limit', t => {
	const items = [{
		label: 'First',
		value: 'first'
	}, {
		label: 'Second',
		value: 'second'
	}];

	const setRef = spy();
	const onSelect = spy();

	build(<SelectInput ref={setRef} items={items} limit={1} onSelect={onSelect}/>);

	const [ref] = setRef.firstCall.args;

	ref.state = {
		rotateIndex: -1,
		selectedIndex: 0
	};

	ref.handleKeyPress('', {
		name: 'return'
	});

	t.true(onSelect.calledOnce);
	t.deepEqual(onSelect.firstCall.args, [items[1]]);
});
