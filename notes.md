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
4. Reading paginate documentation -  and going through the demo, looking for the json server in the file list, stuck and confused for a bit on how to do pagination on the server side
  npm install react-paginate --save
Then I realized the server side is extremely easy and all I had to really do was manipulate the url in the get call, and the important part is the styling on the client side. Readme also said styling is not the important part so I’ll come back to that after (if) I finish all the functionality.
5. Searching was not anything new. ISSUE: Search part doesn’t handle the planet name properly, and some of the results are not very intuitive like if you look up "lu" it shows up more than just Luke because the resulting beings also have "bLUe" eye color.

6. 