import java.util.Scanner;
class natural{
	public static void main(String[]args){
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter a number");
		int a = sc.nextInt();

		for(int i=0; i<=a; i++){
			System.out.println(i);
		}
		sc.close();
	}
}