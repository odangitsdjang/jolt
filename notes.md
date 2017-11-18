Start Time: 6:02 				End Time: 10:02
## Did most of the functionality up to 9. 
## Did everything including this note during the 4 hour time limit. 

## Notes for myself as well as for you, (but mostly for myself)!
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

6. Relatively straightforward.
7. I couldn't get this to work for over 1 hour.. I looked up google but I kept getting 404 back from the backend. I made the rookie mistake of doing a POST request instead of PATCH... duh

8. Relatively straightforward. Moved some code around.

9. Especially doing this section I really show my mastery of context/scope. I'm perfectly able to distinguish what "this" is at every single point in my code.  I had fun specifically changing color for "favorite" or "unfavorite" because at first I tried to change the style for the div class "favorite" but this was clearly not a great approach because of 82 divs having the class "favorite". The best part of my fix here was that it didn't require me to think more than half a second to come up with it. I'm very comfortable with everything from this exercise so far. I just wish I hadn't stumbled on that one bug in #7 for so long :( .. 
```js
favorite() {
    return (e) => {
      if (this.state.favorite) {
        this.setState({ favorite: 0 });
        e.target.style.backgroundColor = 'blue';
      } else {
        this.setState({ favorite: 1 });
        e.target.style.backgroundColor = 'red';
      }
    };
  }
<div onClick={this.favorite()} className="favorite pointer">{this.state.favorite ? "Unfavorite" : "Favorite"}</div>
```
Normally the tradition is to keep the onClick function uninvoked like below, but I invoked it which calls the function right then and there and returns a function that takes in an event. If you do e.target then that is the DOM element itself. 
```js
<div onClick={this.functionName}>
```