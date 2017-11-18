Start Time: 6:02 				End Time: 

## Notes for myself as well as for you!
1. Reading prompt, understanding existing code. My first steps are to:
  - need to change Card’s component to render information dynamically 
   - need to change App file to render all cards
   - make ajax call using axios to http://localhost:3008/people and  http://localhost:3008/planets
```js
npm install —save axios 
``` 
2. ...
3. Was stuck on this one for a little bit. Had some issues because successPlanet is an array and every id starts with 1 and not 0 so I had to offset it by one by subtracting with this line 
```js
person.homeworld = successPlanet.data[person.homeworld-1].name;
``` 
4. 
