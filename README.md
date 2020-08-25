# react-country-flag-currency-picker

A customizable svg flags,currency select components for React Js.

## Installation
The package can be installed via NPM:
```
npm install react-country-flag-currency-picker --save
```

## Usage

```javascript
    <ReactCountryFlagsCurrencySelect />
```

### Default Country

You can select a default country to be rendered.

```javascript
    <ReactCountryFlagsCurrencySelect
    defaultCountry="US" />
```

### Searchable

You can enable search filter using prop `searchable`.

```javascript
    <ReactCountryFlagsCurrencySelect
    searchable={true} />
```

### Search Placeholder

You can set the placeholder text for search using prop `searchPlaceholder`.

```javascript
    <ReactCountryFlagsCurrencySelect
    searchable={true}
    searchPlaceholder="Search for a country" />
```

### onSelect

You can use onSelect event handler which fires each time an option is selected.
`onSelect(countryCode)`.

```javascript
    //onSelect Method
    onSelectFlag(country){
        console.log(country)
    }
    
    //component render
    <ReactCountryFlagsCurrencySelect
    defaultCountry="US"
    onSelect={this.onSelectFlag} />
```
