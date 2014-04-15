from django.shortcuts import render

def views(request):
	context = {'name':'Fay', 'age':17}
	return render(request, 'view.html', context)



	
