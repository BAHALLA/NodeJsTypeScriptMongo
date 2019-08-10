import Calcul from '../src/calcul';
describe("calcul ", () => {
    it("should return 10", ()=> {

        let a: number = 6;
        let b: number = 4;
        let expected : number = 10;
        expect(Calcul.sum(a,b)).toBe(expected);
    });
});