let file = require('./example.json');

// Setup Objects
var calls = {
    'NOTHING': 0,
    'SELECT': 1,
    'FROM': 2,
    'WHERE': 3
}

class WoxDB {

    constructor(JSONObj) {
        this.Raw = JSONObj;
    }

    query(QUERY) {
        var mode = calls.NOTHING;
        var PreviousCallHasArgument = true;
        var SelectedCollumns = [];
        var SelectedTables;
        console.log(QUERY);
        divider();

        var Q = QUERY.split(' ');
        var endLoop = false;
       

        for(var i = 0; i < Q.length; i++) {

            var thisTerm = Q[i];
            switch(thisTerm) {
                // check for syntax
                case 'SELECT':
                    if(PreviousCallHasArgument) {
                        mode = calls.SELECT;
                        PreviousCallHasArgument = false;
                    }
                    else {
                        throwError('Call before "SELECT" has no valid arguments');
                        endLoop = true;
                    }
                    break;

                case 'FROM':
                    if(PreviousCallHasArgument) {
                        mode = calls.FROM;
                        PreviousCallHasArgument = false;
                    }
                    else {
                        throwError('Call before "FROM" has no valid arguments');
                        endLoop = true;
                    }
                    break;
                default:
                    switch(mode) {
                        case 0: 
                            break;
                        case 1:
                            // If select, add collumn to list
                            SelectedCollumns.push(thisTerm);
                            PreviousCallHasArgument = true;
                            break;
                        case 2:
                            // If from, set table
                            SelectedTables = thisTerm;
                            PreviousCallHasArgument = true;
                            break;
                    }
                        
                }

            if(endLoop) break;

        }
        // Select the Table, Using the from keyword
        var Table = this.Raw[SelectedTables.toUpperCase()];
        if(!Table) {
            throwError('Invalid Table');
        }
        // Checkfor primary key
        var PRIMKEY;
        for(var y = 0; y < SelectedCollumns.length; y++) {
            if(Table[SelectedCollumns[y]]) {
                PRIMKEY = SelectedCollumns[y];
            }
        }
        for (var COLLUMN in Table[PRIMKEY]) {
            var RESULT = '';
            for(var x = 0; x < SelectedCollumns.length; x++) {
                if(SelectedCollumns[x] == PRIMKEY) {
                    RESULT += ' ' + COLLUMN;
                }
                else {
                    RESULT += ' ' + (Table[PRIMKEY][COLLUMN][SelectedCollumns[x]]);
                }
                
            }
            console.log(RESULT);
            divider();
        }

        function throwError(err) {
            console.log(err);
        }

    }

}

function divider() {
    console.log('------------');
}

var Database = new WoxDB(file);

Database.query('SELECT ID FIRST_NAME LAST_NAME HIRE_DATE FROM EMPLOYEES');