
import { uniq } from 'lodash';

export const filterWithMembers = (cards, id) => {
    let count = 0
    cards.map( (x, y) => {
        if(x.idMembers.includes(id)) {
            count  = count + 1;
        }
    })
    return count;
}

export const filteredArray = (data) =>  {
    //const keys = ['listAfter'];
    const test = data.map( ( a) => {
        if(a.data.hasOwnProperty('listAfter') && a.data.hasOwnProperty('listBefore')) {
            return  a;
        }
    });
    const aa = test.filter(e => e)

    // const memberList = []
    // for (const list of memberId) {
    //     for (const cards of aa) {
    //         if(list.id === cards.idMemberCreator) {
    //             memberList.push({id:list.id, name: list.fullName, ...cards.data, date: cards.date})
    //         }
    //     }
    // }
    return aa;
}

export const finalArray = (members, boardList) => {

    let test = [];
    for (const userInfo of members) {
        test.push({userData : { ...userInfo}});
        boardList = boardList.filter(item => item);
        boardList.map( (i) => {
            test.push({name: i.name, ...i.cards})
        })
    }
    //console.log('aaraar', test);
    //return aar
}


export const getAllMembers = (array,id) => {
    let fil = []
    array.map( (x) => {
        if(x.idMemberCreator.includes(id)) {
            fil.push({...x})
        }
    })
    console.log(fil);
    return fil;
}

const count = arr => {
    const countReopen = new Map(
      [...new Set(arr)].map(x => [x, arr.filter(y => y === x).length])
    );
  
    let uniqCount = uniq(arr.map(l => l)).map(element => {
      return {
        id: element,
        reopenedTicketCount: countReopen.get(element)
      };
    });
    return uniqCount;
  };
  
  const authorWiseList = data => {
    const arr = data.map(e => e.idMemberCreator);
    return count(arr);
  };
  
  // accepts the lists of all the Trello cards of a particular board as parameter and calculates an array of authors and it's respective reOpenTicket count.
  export const authorsWithReopenTicket = data => {
    const basicList = data
      .map(element => {
        if (
          element.data.hasOwnProperty("listAfter") &&
          element.data.hasOwnProperty("listBefore")
        ) {
          return element;
        }
      })
      .filter(e => e);
  
    const reopendedArray = basicList.filter(
      element =>
        element.data.listAfter.name === "In-progress" &&
        element.data.listBefore.name !== "Todo"
    );
  
    const result =
      reopendedArray.length > 0 ? authorWiseList(reopendedArray) : [];
  
    return result;   // returns a array of object with authorId and reopenedTicketCount
  };
