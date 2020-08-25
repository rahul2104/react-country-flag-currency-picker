'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _countriesCurrency = require('./countries-currency');

var _countriesCurrency2 = _interopRequireDefault(_countriesCurrency);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactCountryFlagsCurrencySelect = function (_Component) {
	_inherits(ReactCountryFlagsCurrencySelect, _Component);

	function ReactCountryFlagsCurrencySelect(props) {
		_classCallCheck(this, ReactCountryFlagsCurrencySelect);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		var defaultCountry = _countriesCurrency2.default[_this.props.defaultCountry] && _this.props.defaultCountry;

		_this.state = {
			openOptions: false,
			defaultCountry: defaultCountry,
			filteredCountries: []
		};

		_this.toggleOptions = _this.toggleOptions.bind(_this);
		_this.closeOptions = _this.closeOptions.bind(_this);
		_this.onSelect = _this.onSelect.bind(_this);
		_this.filterSearch = _this.filterSearch.bind(_this);
		_this.setCountries = _this.setCountries.bind(_this);
		return _this;
	}

	ReactCountryFlagsCurrencySelect.prototype.toggleOptions = function toggleOptions() {
		!this.state.disabled && this.setState({
			openOptions: !this.state.openOptions
		});
	};

	ReactCountryFlagsCurrencySelect.prototype.toggleOptionsWithKeyboard = function toggleOptionsWithKeyboard(evt) {
		evt.preventDefault();
		if (evt.keyCode === 27) {
			//esc key: hide options
			!this.state.disabled && this.setState({
				openOptions: false
			});
		}
	};

	ReactCountryFlagsCurrencySelect.prototype.closeOptions = function closeOptions(event) {
		if (event.target !== this.refs.selectedFlag && event.target !== this.refs.flagOptions && event.target !== this.refs.filterText) {
			this.setState({
				openOptions: false
			});
		}
	};

	ReactCountryFlagsCurrencySelect.prototype.onSelect = function onSelect(countryCode) {
		this.setState({
			selected: countryCode,
			filter: ''
		});
		this.props.onSelect && this.props.onSelect(countryCode);
	};

	ReactCountryFlagsCurrencySelect.prototype.onSelectWithKeyboard = function onSelectWithKeyboard(evt, countryCode) {
		evt.preventDefault();
		if (evt.keyCode === 13) {
			//enter key: select
			this.onSelect(countryCode);
			this.closeOptions(evt);
		} else if (evt.keyCode === 27) {
			//esc key: hide options
			this.toggleOptions();
		}
	};

	ReactCountryFlagsCurrencySelect.prototype.updateSelected = function updateSelected(countryCode) {
		var isValid = _countriesCurrency2.default[countryCode];

		isValid && this.setState({
			selected: countryCode
		});
	};

	ReactCountryFlagsCurrencySelect.prototype.filterSearch = function filterSearch(evt) {
		var _this2 = this;

		var filterValue = evt.target.value;
		var filteredCountries = filterValue && this.state.countries.filter(function (key) {
			var label = _this2.props.customLabels[key] || _countriesCurrency2.default[key];
			return label && label.match(new RegExp(filterValue, 'i'));
		});

		this.setState({ filter: filterValue, filteredCountries: filteredCountries });
	};

	ReactCountryFlagsCurrencySelect.prototype.setCountries = function setCountries() {
		var _this3 = this;

		var fullCountries = Object.keys(_countriesCurrency2.default);

		var selectCountries = this.props.countries && this.props.countries.filter(function (country) {
			return _countriesCurrency2.default[country].name;
		});

		//Filter BlackList
		if (this.props.blackList && selectCountries) {
			selectCountries = fullCountries.filter(function (countryKey) {
				return selectCountries.filter(function (country) {
					return countryKey === country;
				}).length === 0;
			});
		}

		this.setState({
			countries: selectCountries || fullCountries
		}, function () {
			var selected = _this3.state.selected;


			if (selected && !_this3.state.countries.includes(selected)) {
				_this3.setState({ selected: null });
			}
		});
	};

	ReactCountryFlagsCurrencySelect.prototype.componentDidMount = function componentDidMount() {
		this.setCountries();
		!this.props.disabled && window.addEventListener("click", this.closeOptions);
	};

	ReactCountryFlagsCurrencySelect.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
		if (prevProps.countries !== this.props.countries || prevProps.blackList !== this.props.blackList) {
			this.setCountries();
		}
	};

	ReactCountryFlagsCurrencySelect.prototype.componentWillUnmount = function componentWillUnmount() {
		!this.props.disabled && window.removeEventListener("click", this.closeOptions);
	};

	ReactCountryFlagsCurrencySelect.prototype.render = function render() {
		var _this4 = this;

		var isSelected = this.state.selected || this.state.defaultCountry;
		var selectedSize = this.props.selectedSize;
		var optionsSize = this.props.optionsSize;
		var alignClass = this.props.alignOptions.toLowerCase() === 'left' ? 'to--left' : '';

		return _react2.default.createElement(
			'div',
			{ className: 'flag-select ' + (this.props.className ? this.props.className : "") },
			_react2.default.createElement(
				'button',
				{
					ref: 'selectedFlag',
					style: { fontSize: selectedSize + 'px' },
					className: 'flag-select__btn',
					onClick: this.toggleOptions,
					onKeyUp: function onKeyUp(evt) {
						return _this4.toggleOptionsWithKeyboard(evt);
					},
					disabled: this.props.disabled,
					id: 'select_flag_button',
					type: this.props.buttonType,
					'aria-haspopup': 'listbox',
					'aria-expanded': this.state.openOptions,
					'aria-labelledby': 'select_flag_button' },
				isSelected && _react2.default.createElement(
					'span',
					{ className: 'flag-select__option flag-select__option--placeholder' },
					_react2.default.createElement('img', { className: 'flag-select__option__icon', src: require('../flags/' + isSelected.toLowerCase() + '.svg'), alt: isSelected }),
					this.props.showSelectedLabel && _react2.default.createElement(
						'span',
						{ className: 'flag-select__option__label' },
						this.props.customLabels[isSelected] || _countriesCurrency2.default[isSelected].name
					),
					this.props.showCurrency && _react2.default.createElement(
						'span',
						{ className: 'flag-select__option__label' },
						this.props.customLabels[isSelected] || _countriesCurrency2.default[isSelected].currency,
						' '
					),
					this.props.showCurrencySymbol && _react2.default.createElement(
						'span',
						{ className: 'flag-select__option__label' },
						this.props.customLabels[isSelected] || _countriesCurrency2.default[isSelected].symbol
					)
				),
				!isSelected && _react2.default.createElement(
					'span',
					{ className: 'flag-select__option flag-select__option--placeholder' },
					this.props.placeholder
				)
			),
			this.state.openOptions && _react2.default.createElement(
				'ul',
				{ tabIndex: '-1', role: 'listbox', ref: 'flagOptions', style: { fontSize: optionsSize + 'px' }, className: 'flag-select__options ' + alignClass },
				this.props.searchable && _react2.default.createElement(
					'div',
					{ className: 'filterBox' },
					_react2.default.createElement('input', { type: 'text', placeholder: this.props.searchPlaceholder, ref: 'filterText', onChange: this.filterSearch })
				),
				(this.state.filter ? this.state.filteredCountries : this.state.countries).map(function (countryCode) {
					return _react2.default.createElement(
						'li',
						{
							key: countryCode,
							role: 'option',
							tabIndex: '0',
							id: 'select_flag_' + countryCode,
							className: 'flag-select__option ' + (_this4.props.showOptionLabel ? 'has-label' : ''),
							onClick: function onClick() {
								return _this4.onSelect(countryCode);
							},
							onKeyUp: function onKeyUp(evt) {
								return _this4.onSelectWithKeyboard(evt, countryCode);
							} },
						_react2.default.createElement(
							'span',
							{ style: { width: optionsSize + 'px', height: optionsSize + 'px' } },
							_react2.default.createElement('img', {
								className: 'flag-select__option__icon',
								alt: 'flag for ' + _countriesCurrency2.default[countryCode].name,
								src: require('../flags/' + countryCode.toLowerCase() + '.svg') }),
							_this4.props.showOptionLabel && _react2.default.createElement(
								'span',
								{ className: 'flag-select__option__label' },
								_this4.props.customLabels[countryCode] || _countriesCurrency2.default[countryCode].name
							),
							_this4.props.showCurrency && _react2.default.createElement(
								'span',
								{ className: 'flag-select__option__label' },
								_this4.props.customLabels[countryCode] || _countriesCurrency2.default[countryCode].currency
							),
							_this4.props.showCurrencySymbol && _react2.default.createElement(
								'span',
								{ className: 'flag-select__option__label' },
								_this4.props.customLabels[countryCode] || _countriesCurrency2.default[countryCode].symbol
							)
						)
					);
				})
			)
		);
	};

	return ReactCountryFlagsCurrencySelect;
}(_react.Component);

ReactCountryFlagsCurrencySelect.defaultProps = {
	selectedSize: 16,
	optionsSize: 14,
	placeholder: "Select a country",
	showSelectedLabel: true,
	showOptionLabel: true,
	alignOptions: "right",
	customLabels: {},
	disabled: false,
	buttonType: "button",
	blackList: false,
	searchable: false,
	searchPlaceholder: 'Search',
	showCurrency: true,
	showCurrencySymbol: true
};

ReactCountryFlagsCurrencySelect.propTypes = process.env.NODE_ENV !== "production" ? {
	countries: _propTypes2.default.array,
	blackList: _propTypes2.default.bool,
	customLabels: _propTypes2.default.object,
	selectedSize: _propTypes2.default.number,
	optionsSize: _propTypes2.default.number,
	defaultCountry: _propTypes2.default.string,
	placeholder: _propTypes2.default.string,
	className: _propTypes2.default.string,
	showSelectedLabel: _propTypes2.default.bool,
	showOptionLabel: _propTypes2.default.bool,
	alignOptions: _propTypes2.default.string,
	onSelect: _propTypes2.default.func,
	disabled: _propTypes2.default.bool,
	buttonType: _propTypes2.default.string,
	searchable: _propTypes2.default.bool,
	searchPlaceholder: _propTypes2.default.string,
	showCurrency: _propTypes2.default.bool,
	showCurrencySymbol: _propTypes2.default.bool
} : {};

exports.default = ReactCountryFlagsCurrencySelect;
module.exports = exports['default'];